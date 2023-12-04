[![wakatime](https://wakatime.com/badge/user/7217dc82-1bcf-4a0a-8b7f-96e2332f4c45/project/018b960f-87c9-4136-90b5-276b5bd721a7.svg?style=for-the-badge)](https://wakatime.com/badge/user/7217dc82-1bcf-4a0a-8b7f-96e2332f4c45/project/018b960f-87c9-4136-90b5-276b5bd721a7)

# NextJS Markdown Blogs

> Note: aking functionality first

A dynamic and personalized blogging platform built with Next.js 14 using the App Router (no actions). Create and manage your blog posts stored as Markdown files (.md) within the `posts` folder.

## Features:

- **Dynamic Content:** Blog posts are created as Markdown files in the `posts` folder, allowing easy content management.

- **Metadata Extraction:** Utilizing Gray-matter, extract metadata for each blog post, including title, author, date, and featured status.

- **Dynamic Routing:** Next.js handles dynamic routing for individual blog posts via the `/posts/[slug]` route.

- **Listing Posts:** Display featured posts on the home page, all posts on the all-posts page, and provide individual pages for each blog post.

- **React-Markdown:** Render blog post content using React-Markdown, facilitating easy formatting with Markdown.

- **User Authentication:** Implemented NextAuth for account creation with credentials, supporting secure login with email and password. Additionally, enable third-party authentication using GitHub and Google. User data is securely stored in the database.

## Getting Started:

1. **Clone the Repository:** Begin by cloning this repository to your local machine.

2. **Install Dependencies:** Execute `npm install` or `yarn install` to install required dependencies.

3. **Create Blog Posts:** In the `posts` folder, craft blog posts as `.md` files. Define metadata at the top and then write content in Markdown.

4. **Run the Project:** Use `npm run dev` or `yarn dev` to launch the Next.js development server.

5. **Explore Your Blog:** Open your web browser and visit `http://localhost:3000` to view and navigate your blog. Individual posts can be accessed at `/posts/[slug]`.

## Technologies Used:

- **Next.js 14:** React framework for server-side rendering and smooth navigation.
- **TypeScript:** Enhances code quality and developer productivity with static typing.
- **Shadcn (UI elements):** Modern React component library for a visually appealing interface.
- **Tailwind CSS:** Utility-first framework for responsive and consistent designs.
- **MongoDB:** NoSQL database for secure storage of user data.
- **NextAuth:** Authentication library for Next.js, supporting email/password and third-party logins.
- **Markdown (Content storage):** Lightweight syntax for managing blog post content.

## Additional Information:

- **License:** This project is licensed under the MIT License - see the [LICENSE](MIT-LICENSE.txt) file for details.

- **Privacy Policy:** Read the [Privacy Policy](/privacy-policy.md).

- **Terms of Service:** View the [Terms of Service](/terms-of-service.md).

---

### Happy blogging!
