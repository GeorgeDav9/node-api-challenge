// Express import
const express = require('express');
// Project data import
const Projects = require('./projectModel.js')
// Router declaration
const router = express.Router();


// GET projects
router.get('/', (req, res) => {
    console.log(Projects);
    Projects.get().then(projects => {
      res.status(200).json(projects);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving projects" });
    });
  });
  
  // getProjectActions()
  router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
  
    Projects.getProjectActions(id).then(actions => {
      res.status(200).json(actions);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving actions" });
    });
  });
  
  // POST 
  router.post('/', (req, res) => {
    const projectData = req.body;
  
    if (!projectData.name || !projectData.description) {
      res.status(400).json({ message: "Please provide a name and description for this post." })
    } else {
      Projects.insert(projectData).then(post => {
        res.status(201).json(post);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "There was an error saving the post to the database." })
      });
    };
  });
  
  // PUT
  router.put('/:id', (req, res) => {
    const projectData = req.body;
    const id = req.params.id;
  
    if (!id) {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
    } else if (!projectData.name || !projectData.description) {
      res.status(400).json({ message: "Please provide a name and description for this post." })
    } else {
      Projects.update(id, projectData).then(post => {
        res.status(200).json(post);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "The post's information could not be retrieved." })
      });
    };
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    if (!id) {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
    } else {
      Projects.remove(id).then(removed => {
        res.status(200).json(removed);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "The post's information could not be retrieved." })
      });
    };
  });
  
  
  module.exports = router;