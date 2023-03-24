const router = require ('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
  
        req.session.save(() => {
          req.session.user_id = postData.id;
          req.session.logged_in = true;
    
          res.status(200).json(postData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
    });

    router.delete('/:id', withAuth, (req, res) => {
        Post.destroy({
             where: {
               id: req.params.id,
             },
           })
       .then((postData) =>{
           if (!postData) {
             res.status(404).json({ message: 'No post found with this ID' });
             return;
           }
       
           res.status(200).json(postData);
         }) .catch ((err) => {
             console.log(err);
           res.status(500).json(err);
         });
       });

       module.exports = router;