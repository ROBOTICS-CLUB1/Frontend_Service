import { sanityClient } from '../lib/sanity';

export interface PostData {
  _id: string;
  title: string;
  content: string; // mapped from body (simplification, real body is PortableText)
  author: {
    _id: string;
    username: string;
  };
  tags: {
    _id: string;
    name: string;
    type: string;
  }[];
  mainTag: {
    _id: string;
    name: string;
    type: string;
  };
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const uploadImage = async (file: File) => {
  const asset = await sanityClient.assets.upload('image', file);
  return asset;
};

// Get all posts
export const getPosts = async (): Promise<PostData[]> => {
  // Note: Actual 'body' in Sanity is BlockContent. For this list view/interface, 
  // we might want just a snippet or we'll convert to string. 
  // Fetching body blocks for now.
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    body,
    "imageUrl": mainImage.asset->url,
    "authorData": author->{name, _id},
    publishedAt,
    _updatedAt,
    "categories": categories[]->{title, _id}
  }`;

  const posts = await sanityClient.fetch(query);

  return posts.map((p: any) => ({
    _id: p._id,
    title: p.title,
    // Flattening PortableText to simple string for 'content' prop compatibility is complex
    // For now, providing a placeholder or basic text extraction if possible. 
    // Ideally UI should render PortableText.
    content: "Click to read more...",
    imageUrl: p.imageUrl,
    author: {
      _id: p.authorData?._id || 'unknown',
      username: p.authorData?.name || 'Unknown Author'
    },
    // Mapping Sanity categories to 'tags' and 'mainTag' structure
    tags: p.categories?.map((c: any) => ({ _id: c._id, name: c.title, type: 'category' })) || [],
    mainTag: p.categories?.[0] ? { _id: p.categories[0]._id, name: p.categories[0].title, type: 'category' } : { _id: 'gen', name: 'General', type: 'category' },
    createdAt: p.publishedAt || p._updatedAt,
    updatedAt: p._updatedAt
  }));
}

export const createPost = async (postData: FormData) => {
  const title = postData.get('title') as string;
  // content from UI might be string, but Sanity expects block content.
  // We'll create a simple block for it.
  const contentText = postData.get('content') as string;
  const file = postData.get('image') as File;

  let imageAsset;
  if (file && file.size > 0) {
    imageAsset = await uploadImage(file);
  }

  const doc = {
    _type: 'post',
    title,
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: contentText,
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    mainImage: imageAsset ? {
      _type: 'image',
      asset: {
        _type: "reference",
        _ref: imageAsset._id
      }
    } : undefined
  };

  const created = await sanityClient.create(doc);
  return created;
}

export const updatePost = async (id: string, postData: FormData) => {
  const title = postData.get('title') as string;
  const contentText = postData.get('content') as string;
  const file = postData.get('image') as File;

  const updates: any = {
    title,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: contentText }],
        markDefs: [],
        style: 'normal'
      }
    ]
  };

  if (file && file.size > 0) {
    const imageAsset = await uploadImage(file);
    updates.mainImage = {
      _type: 'image',
      asset: {
        _type: "reference",
        _ref: imageAsset._id
      }
    };
  }

  const updated = await sanityClient.patch(id).set(updates).commit();
  return updated;
}

export const deletePost = async (id: string) => {
  return await sanityClient.delete(id);
}