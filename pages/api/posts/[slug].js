import { getPostBySlug } from "../../../lib/api";

export default (req, res) => {
  const { slug } = req.query;
  res.status(200).json({
    name: getPostBySlug(slug, [
      "title",
      "date",
      "slug",
      "author",
      "excerpt",
      "content",
    ]),
  });
};
