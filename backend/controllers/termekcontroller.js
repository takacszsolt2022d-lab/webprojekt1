import TermekModel from '../models/termekmodels.js';

const TermekController = {
  async getAllTermek(req, res) {
    try {
      const termekek = await TermekModel.getAll();
      res.json(termekek);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getTermekById(req, res) {
    const { id } = req.params;

    try {
      const termek = await TermekModel.getById(id);
      if (termek) {
        res.json(termek);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createTermek(req, res) {
    try {
      const termek = await TermekModel.create(req.body);
      res.status(201).json(termek);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateTermek(req, res) {
    const { id } = req.params;

    try {
      const termek = await TermekModel.update(id, req.body);
      res.json(termek);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteTermek(req, res) {
    const { id } = req.params;

    try {
      await TermekModel.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default TermekController;