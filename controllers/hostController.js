const Home  = require('../models/home');
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

// Add new home
// ...existing code...
// ...existing code...
exports.getAddHome = (req, res, next) => {
  try {
    const isLoggedIn = req.session ? !!req.session.isLoggedIn : false;
    const user = req.session ? req.session.user : null;

    const viewPath = path.join(process.cwd(), 'views', 'host', 'edit-home.ejs');
    console.log('getAddHome viewPath:', viewPath, 'exists:', fs.existsSync(viewPath));

    if (!fs.existsSync(viewPath)) {
      console.error('View not found at', viewPath, '— check filename case (Linux is case-sensitive).');
      return res.status(500).send('View host/edit-home.ejs not found on server (check filename case).');
    }

    return res.render('host/edit-home', {
      pageTitle: 'Register Homes',
      currentPage: 'addHome',
      editing: false,
      isLoggedIn,
      user
    });
  } catch (err) {
    console.error('getAddHome error:', err);
    return res.status(500).send('Server error - check logs');
  }
};
// ...existing code...
// ...existing code...

exports.postAddHome = async (req, res, next) => {
  try {
    const { homeName, price, location, rating, description } = req.body;

    if (!req.files || !req.files.image || !req.files.image[0]) {
      console.log("No image provided");
      return res.status(422).send("No image provided");
    }

    const imagePath = req.files.image[0].path;
    const rulesFileTempPath = req.files.rulesFile && req.files.rulesFile[0] ? req.files.rulesFile[0].path : null;

    const home = new Home({ homeName, price, location, rating, image: imagePath, description });

    if (rulesFileTempPath) {
      const newFileName = `${home._id}.pdf`;
      const newFilePath = path.join('rules-files', newFileName);
      await fsPromises.rename(rulesFileTempPath, newFilePath);
      home.rulesFile = newFilePath;
    }

    await home.save();
    console.log("home saved successfully");
    return res.redirect('/host/host-home-list');
  } catch (error) {
    console.log("Failed to save home ", error);
    return next(error);
  }
}

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registerHomes) =>
    res.render('host/host-home-list', {
      registerHomes : registerHomes,
      pageTitle : 'Host Homes list',
      currentPage : 'host-homes',
      isLoggedIn : req.session.isLoggedIn,
      user:req.session.user
    })
  ).catch(err => next(err));
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then((home) => {
    if(!home) {
      console.log("Home not found for editing.");
      return res.redirect('/host/host-home-list');
    }

    res.render('host/edit-home', {
      home: home,
      pageTitle: 'Register Homes',
      currentPage : 'host-homes',
      editing : editing,
      isLoggedIn : req.session.isLoggedIn,
      user:req.session.user
    });
  }).catch(err => next(err));
}

exports.postEditHome = async (req, res, next) => {
  try {
    const { id, homeName, price, location, rating, description } = req.body;
    const home = await Home.findById(id);
    if (!home) {
      console.log("Home not found for update");
      return res.redirect('/host/host-home-list');
    }

    home.homeName = homeName;
    home.rating = rating;
    home.description = description;
    home.price = price;
    home.location = location;

    // Image update
    if (req.files && req.files.image && req.files.image[0]) {
      try {
        if (home.image && fs.existsSync(home.image)) {
          await fsPromises.unlink(home.image);
        }
      } catch (err) {
        console.log("Error while deleting old image", err);
      }
      home.image = req.files.image[0].path;
    }

    // Rules file update
    if (req.files && req.files.rulesFile && req.files.rulesFile[0]) {
      try {
        if (home.rulesFile && fs.existsSync(home.rulesFile)) {
          await fsPromises.unlink(home.rulesFile);
        }
      } catch (err) {
        console.log("Error while deleting old rulesFile", err);
      }

      const rulesFileTempPath = req.files.rulesFile[0].path;
      if (rulesFileTempPath) {
        const newFileName = `${home._id}.pdf`;
        const newFilePath = path.join('rules-files', newFileName);
        await fsPromises.rename(rulesFileTempPath, newFilePath);
        home.rulesFile = newFilePath;
      }
    }

    await home.save();
    console.log("Home updated:", home._id);
    return res.redirect('/host/host-home-list');
  } catch (error) {
    console.log("Error while updating home", error);
    return next(error);
  }
}

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete homeId:", homeId);

  Home.findByIdAndDelete(homeId)
    .then(() => {
      console.log("Successfully deleted");
      res.redirect('/host/host-home-list');
    })
    .catch(err => {
      console.log("Error while deleting:", err);
      res.redirect('/host/host-home-list');
    });
};