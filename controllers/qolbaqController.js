import QolbaqModel from "../models/qolbaqModel.js";

const qolbaqAdd = async (req, res) => {
  const { title, description, thumbnail, price, distance, catagory,stock } = req.body;
  let photo = '';

  // Eğer bir fotoğraf dosyası mevcutsa base64 olarak dönüştür
  if (req.file) {
    photo = req.file.buffer.toString('base64');
  }

  try {

  
    // Yeni pubg postu oluştur ve fotoğrafı ekle
    const qolbaq = await QolbaqModel.create({
      title,
      description,
      thumbnail,
      price,
      distance,
      catagory,
      stock,
      photo,
    });

    res.status(201).json({ qolbaq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const qolbaqUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const qolbaq = await QolbaqModel.findById(id);
    if (!qolbaq) {
      return res.status(404).json({ message: "qolbaq post not found" });
    }

    // Güncellenmiş veriyi konsolda kontrol et
    console.log("Gelen Güncelleme:", req.body);

    // Gelen verileri güncelle
    qolbaq.title = req.body.title || qolbaq.title;
    qolbaq.price = req.body.price || qolbaq.price;

    // Fotoğraf güncelleme (Eğer formda fotoğraf varsa)
    if (req.file) {
      qolbaq.photo = req.file.buffer.toString("base64");
    }

    // Kaydet ve döndür
    const updatedQolbaq = await qolbaq.save();
    console.log("Güncellenmiş Veri:", updatedQolbaq);

    res.json(updatedQolbaq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



const getQolbaq = async (req, res) => {
  try {
    const allQolbaq = await QolbaqModel.find();
    res.json({ allQolbaq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByIdQolbaq = async (req, res) => {
  const { id } = req.params;
  try {
      const getById = await QolbaqModel.findById(id);
      if (!getById) {
          return res.status(404).json({ error: "Note not found" });
      }
      res.json({ getById });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await QolbaqModel.findOneAndDelete({ _id: id });
    if (!deletedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ deletedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByCategoryQolbaq = async (req, res) => {
  const { catagory } = req.params;
  try {
      const filteredQolbaq = await QolbaqModel.find({ catagory });
      if (!filteredQolbaq.length) {
          return res.status(404).json({ error: "Ürün bulunamadı" });
      }
      res.json({ allQolbaq: filteredQolbaq });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};



export { qolbaqAdd, getQolbaq, getByIdQolbaq, deleteById, getByCategoryQolbaq, qolbaqUpdate };
