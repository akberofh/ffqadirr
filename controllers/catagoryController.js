import CatagoryModel from "../models/catagoryModel.js";


const catagoryAd = async (req, res) => {
    const { title } = req.body;
    let photo = '';

    if (req.file) {
        photo = req.file.buffer.toString('base64');
    }

    try {

        const catagory = await CatagoryModel.create({
            title,
            photo,
        });

        res.status(201).json({ catagory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




const catagoryUpdate = async (req, res) => {
    const { id } = req.params;
   
    try {


        const catagory = await CatagoryModel.findById(id);

        if (!catagory) {
            return res.status(404).json({ message: 'catagory post not found' });
        }

        // Güncelleme işleminden önce mevcut veriyi kontrol et
        console.log("Önceki Veri: ", catagory);

        // Gelen verileri güncelle
        catagory.title = req.body.title !== undefined ? req.body.title : catagory.title;


        // Eğer bir fotoğraf dosyası mevcutsa, base64 formatında güncelle
        if (req.file) {
            catagory.photo = req.file.buffer.toString('base64');
        }

        // Güncellenmiş dest kaydını kaydet
        const updatecatagory = await catagory.save();

        // Güncellenmeden sonraki veriyi kontrol et
        console.log("Güncellenmiş Veri: ", updatecatagory);

        // Güncellenmiş veriyi döndür
        res.json({
            _id: updatecatagory._id,
            title: updatecatagory.title,
            photo: updatecatagory.photo,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




const getCatagory = async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query; // Sayfa numarası ve limit parametrelerini alıyoruz, varsayılan olarak 1 ve 5
      const skip = (page - 1) * limit; // Skip değeri, hangi kategorilerden başlayacağımızı hesaplıyor
  
      const allCatagory = await CatagoryModel.find()
        .skip(skip) // Skip kullanarak başlamak istediğimiz veriyi belirliyoruz
        .limit(limit); // Belirtilen limit kadar kategori getiriyoruz
  
      const totalCatagoryCount = await CatagoryModel.countDocuments(); // Toplam kategori sayısını alıyoruz
      const totalPages = Math.ceil(totalCatagoryCount / limit); // Toplam sayfa sayısını hesaplıyoruz
  
      res.json({
        allCatagory,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

const getByIdCatagory = async (req, res) => {
    const { id } = req.params;
    try {
        const getById = await CatagoryModel.findById(id);
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
        const deletedData = await CatagoryModel.findOneAndDelete({ _id: id });
        if (!deletedData) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.json({ deletedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { catagoryAd, getCatagory, getByIdCatagory, deleteById, catagoryUpdate };
