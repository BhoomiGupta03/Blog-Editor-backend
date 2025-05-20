import Blog from '../models/Blog.js';

export const saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const userId = req.userId;

  try {
    let blog;
    if (id) {
      blog = await Blog.findOneAndUpdate(
        { _id: id, user: userId },
        { title, content, tags, status: 'draft', updated_at: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'draft', user: userId });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save draft' });
  }
};

export const publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  const userId = req.userId;

  try {
    let blog;
    if (id) {
      blog = await Blog.findOneAndUpdate(
        { _id: id, user: userId },
        { title, content, tags, status: 'published', updated_at: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'published', user: userId });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish blog' });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.userId });
    res.status(200).json(blogs);
  } catch {
    res.status(500).json({ message: 'Error retrieving blogs' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, user: req.userId });
    res.status(200).json(blog);
  } catch {
    res.status(500).json({ message: 'Error retrieving blog' });
  }
};


