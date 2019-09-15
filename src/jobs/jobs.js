var errors = require('../services/errors')
import {
  Job,
  DoneCallback
} from "kue";
const kue = require("kue");


const CREATED = "created";
const ERROR_COULD_NOT_SAVER = errors.ERROR_UNABLE_SAVE_PRODUCT
const PRIORITY_HIGH = "high"

import models from '../models';

/**
 * scrapCategory should create jobs based on requests made by users 
 * in order to create tasks that will scrap pages
 * 
 * @params category
 * @params url
 */
module.exports.scrapCategory = async (req, res) => {
  let status = 401
  let message;
  let job;
  const queue = kue.createQueue()

  // MOVE THIS CODE TO CATEGORY/NEW ENDPOINT
  // let category = await models.Category.findByName({
  //   name: req.body.category
  // })

  // CHECK IF JOB ALREADY EXIST
  message = "job already exists"
  if (!job) {
    const queueName = `CAT/${category.name}`
    const description = `Attemp to scrap AWS category.name`
    const data = req.body.url
    status = 200
    queue.create(description, {
        title: queueName,
        data: data
      })
      .priority(PRIORITY_HIGH)
      .save()

    queue.process(description, (
      Job,
      DoneCallback
    ) => {
      console.log("URL TO SCRAP", Job.data.data)
      DoneCallback()
    });
    message = "job successfully created"
  }

  res.status(status).json({
    "message": message
  });
}