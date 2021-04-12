import { getAllPosts } from "../../lib/api";

export default (req, res) => {
  res
    .status(200)
    .json({
      name: getAllPosts(["title", "date", "slug", "author", "excerpt"]),
    });
};
