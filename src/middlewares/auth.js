export const checkRole = (roles) => {
  return (req, res, next) => {
    // AUTENTICADO
    if (!req.user) {
      return res.json({
        status: "error",
        message: "You need to be authenticated",
      });
    }
    // AUTORIZADO
    if (!roles.include(req.user.role)) {
      return res.json({ status: "error", message: "You are not authorized" });
    }
    next();
  };
};
