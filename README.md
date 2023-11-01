# Next.js Blog Project

This is a simple blog project built with Next.js. It allows you to create and manage blog posts stored as Markdown files (.md) within the `posts` folder. These posts are dynamically loaded and displayed on your blog website.

## Features

- **Dynamic Content**: Blog posts are created as Markdown files and stored in the `posts` folder. These files contain the content of your blog posts.

- **Metadata Extraction**: Metadata for each blog post is extracted using Gray-matter, allowing you to define properties such as the post title, author, date, and whether it's featured.

- **Dynamic Routing**: Next.js handles dynamic routing for individual blog posts using their slug. Each blog post can be accessed via the `/posts/[slug]` route.

- **Listing Posts**: You can list featured posts on the home page, all posts on the all-posts page, and have individual pages for each blog post.

- **React-Markdown**: The content of your blog posts is rendered using React-Markdown, making it easy to format your posts using Markdown.

## Getting Started

1. **Clone the repository**: Start by cloning this repository to your local machine.

2. **Install Dependencies**: Use `npm install` or `yarn install` to install all the required dependencies.

3. **Create Blog Posts**: In the `posts` folder, create your blog posts as `.md` files. Define metadata at the top of each file and then write the content in Markdown format.

4. **Run the Project**: Use `npm run dev` or `yarn dev` to run the Next.js development server.

5. **Explore the Blog**: Open your web browser and navigate to `http://localhost:3000` to view your blog. You can access individual posts at `/posts/[slug]`.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy blogging!
