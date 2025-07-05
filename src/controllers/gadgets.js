const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateCodename = require("../utils/codename");
const getSuccessProbability = require("../utils/probability");

// GET /gadgets
exports.getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const gadgets = await prisma.gadget.findMany({
      where: status ? { status } : {},
    });

    const withProbability = gadgets.map(g => ({
      ...g,
      successProbability: `${getSuccessProbability()}%`
    }));

    res.json(withProbability);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gadgets." });
  }
};

// POST /gadgets
exports.addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    const codename = generateCodename();

    const gadget = await prisma.gadget.create({
      data: { name, codename }
    });

    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Failed to add gadget." });
  }
};

// PATCH /gadgets/:id
exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.gadget.update({
      where: { id },
      data
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update gadget." });
  }
};

// DELETE /gadgets/:id
exports.decommissionGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date()
      }
    });

    res.json({ message: "Gadget decommissioned", gadget: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to decommission gadget." });
  }
};

// POST /gadgets/:id/self-destruct
exports.selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    const confirmationCode = Math.random().toString(36).slice(2, 8).toUpperCase();

    res.json({
      message: `Self-destruct sequence triggered for ${gadget.codename}`,
      confirmationCode
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate self-destruct." });
  }
};
