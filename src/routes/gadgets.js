const express = require("express");
const router = express.Router();
const controller = require("../controllers/gadgets");

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: IMF Gadget management
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve all gadgets with random success probability
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of gadgets
 */

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Add a new gadget
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Gadget created successfully
 */

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget's name or status
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gadget updated
 */

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Mark a gadget as decommissioned (soft delete)
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gadget decommissioned
 */

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger self-destruct sequence for a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Self-destruct initiated
 */

router.get("/", controller.getAllGadgets);
router.post("/", controller.addGadget);
router.patch("/:id", controller.updateGadget);
router.delete("/:id", controller.decommissionGadget);
router.post("/:id/self-destruct", controller.selfDestruct);

module.exports = router;
