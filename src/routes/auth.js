const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes for IMF agents
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login as an existing agent
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: ethan
 *               password:
 *                 type: string
 *                 example: hunt
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       401:
 *         description: Invalid credentials
 */

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const agent = await prisma.user.findUnique({ where: { username } });

  if (!agent || !bcrypt.compareSync(password, agent.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: agent.id, username: agent.username, role: agent.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new agent
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: newagent
 *               password:
 *                 type: string
 *                 example: securepass
 *               role:
 *                 type: string
 *                 example: agent
 *     responses:
 *       201:
 *         description: Agent registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Agent registered
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *       409:
 *         description: Username already exists
 *       400:
 *         description: Missing username or password
 */

// POST /register
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: role || "agent",
    },
  });

  res.status(201).json({
    message: "Agent registered",
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
    },
  });
});

module.exports = router;
