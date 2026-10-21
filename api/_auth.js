const crypto = require("crypto");
const COOKIE = "plg_paddock";
function token() {
  const pw = process.env.SITE_PASSWORD || "";
  return crypto.createHmac("sha256", "plg-motogp-follow-up").update(pw).digest("hex");
}
function hasAccess(req) {
  const raw = req.headers.cookie || "";
  const found = raw.split(/;\s*/).find(c => c.startsWith(COOKIE + "="));
  if (!found || !process.env.SITE_PASSWORD) return false;
  const val = found.slice(COOKIE.length + 1);
  const exp = token();
  return val.length === exp.length && crypto.timingSafeEqual(Buffer.from(val), Buffer.from(exp));
}
module.exports = { COOKIE, token, hasAccess };
