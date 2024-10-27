## Backend 

### Steps to run in development mode
- Recommended: Install pnpm in your environment 
    `npm i -g pnpm`

- Install dependencies
    `pnpm i`

- Run the server in dev mode
    `pnpm dev`

### Steps to run in prod mode
- Configure `.env` file using your environments

- Build the the server
    `pnpm build`

- Run built package
    `pnpm serve`

### Steps to run the app using Docker
- Build the image
    `docker build -t backend .`

- Run the container
    `docker run -p 3000:3000 backend`