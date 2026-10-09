import termekModel from "../models/termekmodels.js";

const termekController = {
  async getAllTermek(req, res) {
    try {
      const termek = await termekModel.getAllTermek();
      res.json(termek);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getTermekById(req, res) {
    try {
      const { id } = req.params;
      const termek = await termekModel.getbyId(id);
      if (!termek) {
        return res.status(404).json({ error: 'Termék nem található' });
      }
      return res.json(termek);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createTermek(req, res) {
    try {
      const termek = await termekModel.createTermek(req.body);
      return res.status(201).json(termek);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateTermek(req, res) {
    try {
      const { id } = req.params;
      const termek = await termekModel.updateTermek(id, req.body);
      return res.json(termek);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteTermek(req, res) {
    try {
      const { id } = req.params;
      const result = await termekModel.deleteTermek(id);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default termekController;