import { sanityClient } from '../lib/sanity';

export interface ProjectData {
  _id: string;
  title: string;
  content: string; // mapped from description
  author: { _id: string; username: string }; // We'll need to mock or fetch this properly if author is a reference differently
  mainTag: { _id: string; name: string; type: string };
  tags: { _id: string; name: string; type: string }[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Helper to upload image
const uploadImage = async (file: File) => {
  const asset = await sanityClient.assets.upload('image', file);
  return asset;
};

// Get all projects
export const getProjects = async (): Promise<ProjectData[]> => {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "content": description,
    "mainTag": { 
      "_id": category, 
      "name": category,
      "type": "category" 
    },
    "tags": stack[] { 
      "_id": @, 
      "name": @, 
      "type": "technology" 
    },
    "imageUrl": mainImage.asset->url,
    "_createdAt": _createdAt,
    "_updatedAt": _updatedAt
  }`;

  const projects = await sanityClient.fetch(query);

  // Map to match existing interface expectation roughly
  return projects.map((p: any) => ({
    ...p,
    createdAt: p._createdAt,
    updatedAt: p._updatedAt,
    // Providing default/mock data for structure not in this schema but expected by UI
    author: { _id: 'admin', username: 'Admin' }
  }));
}

// Get single project by ID
export const getProjectById = async (id: string): Promise<ProjectData> => {
  const query = `*[_type == "project" && _id == $id][0] {
    _id,
    title,
    "content": description,
     "mainTag": { 
      "_id": category, 
      "name": category,
      "type": "category" 
    },
    "tags": stack[] { 
      "_id": @, 
      "name": @, 
      "type": "technology" 
    },
    "imageUrl": mainImage.asset->url,
    "_createdAt": _createdAt,
    "_updatedAt": _updatedAt
  }`;

  const p = await sanityClient.fetch(query, { id });
  if (!p) throw new Error('Project not found');

  return {
    ...p,
    createdAt: p._createdAt,
    updatedAt: p._updatedAt,
    author: { _id: 'admin', username: 'Admin' }
  };
}

// Create new project
export const createProject = async (projectData: FormData): Promise<ProjectData> => {
  const title = projectData.get('title') as string;
  const description = projectData.get('content') as string; // UI sends 'content', schema uses 'description'
  const category = projectData.get('mainTag') as string; // UI logic might need adjustment, assuming getting string
  const file = projectData.get('image') as File;

  // Handle tags - expecting comma separated string or array from formData
  // For simplicity assuming getting a string we parse
  // In AdminDashboard it sent FormData directly.

  let imageAsset;
  if (file && file.size > 0) {
    imageAsset = await uploadImage(file);
  }

  const doc = {
    _type: 'project',
    title,
    description,
    category,
    // stack: tags, // We might need to process tags better
    mainImage: imageAsset ? {
      _type: 'image',
      asset: {
        _type: "reference",
        _ref: imageAsset._id
      }
    } : undefined
  };

  const created = await sanityClient.create(doc);
  return getProjectById(created._id);
}

// Update project
export const updateProject = async (id: string, projectData: FormData): Promise<ProjectData> => {
  const title = projectData.get('title') as string;
  const description = projectData.get('content') as string;
  const category = projectData.get('mainTag') as string;
  const file = projectData.get('image') as File;

  const updates: any = {
    title,
    description,
    category,
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

  await sanityClient.patch(id).set(updates).commit();
  return getProjectById(id);
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await sanityClient.delete(id);
}