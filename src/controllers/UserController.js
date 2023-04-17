exports.getAllUsers = async (req, res) => {
    try {
      res.status(200).send('List of all users');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  