const Store = require('../models/store.model');


const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores', error: err });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching store', error: err });
  }
};

const createStore = async (req, res) => {
  try {
    const newStore = new Store(req.body);
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(400).json({ message: 'Error creating store', error: err });
  }
};


const updateStore = async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStore) return res.status(404).json({ message: 'Store not found' });
    res.status(200).json(updatedStore);
  } catch (err) {
    res.status(400).json({ message: 'Error updating store', error: err });
  }
};


const deleteStore = async (req, res) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(req.params.id);
    if (!deletedStore) return res.status(404).json({ message: 'Store not found' });
    res.status(200).json({ message: 'Store deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting store', error: err });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
