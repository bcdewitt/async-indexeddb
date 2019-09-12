# Start with Alpine Linux and Node 12.8.1 installed
FROM node:12.8.1-alpine

# Create the /app folder and set it as the working directory
WORKDIR /app

# Use the non-root "node" user for any further RUN, CMD, or ENTRYPOINT instructions
USER node

# Don't need anything else special...just access to sh to run npm and other commands
CMD ["/bin/sh"]
