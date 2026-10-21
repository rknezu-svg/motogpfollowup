const crypto = require("crypto");
const { COOKIE, token } = require("./_auth");
function readBody(req) {
  return new Promise(resolve => {
    if (req.body !== undefined) {
      if (typeof req.body === "object" && req.body !== null && !Buffer.isBuffer(req.body)) return resolve(req.body);
      return resolve(Object.fromEntries(new URLSearchParams(String(req.body))));
    }
    let data = "";
    req.on("data", c => (data += c));
    req.on("end", () => resolve(Object.fromEntries(new URLSearchParams(data))));
  });
}
module.exports = async (req, res) => {
  if (req.method !== "POST") { res.statusCode = 302; res.setHeader("Location", "/login"); return res.end(); }
  const body = await readBody(req);
  const given = String(body.password || "").trim();
  const expected = process.env.SITE_PASSWORD || "";
  const a = Buffer.from(given.toUpperCase()), b = Buffer.from(expected.toUpperCase());
  const ok = expected && a.length === b.length && crypto.timingSafeEqual(a, b);
  res.setHeader("Cache-Control", "no-store");
  if (!ok) { res.statusCode = 303; res.setHeader("Location", "/login?error=1"); return res.end(); }
  res.setHeader("Set-Cookie", `${COOKIE}=${token()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`);
  res.statusCode = 303;
  res.setHeader("Location", "/");
  res.end();
};
