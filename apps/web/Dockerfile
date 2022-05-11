ARG NODE_VERSION=alpine
FROM node:${NODE_VERSION}

ENV USER "node"
ENV PORT 3000

# Define node user which is the app's runner
USER $USER

# setup application folders
WORKDIR /home/$USER/app
COPY --chown=$USER:$USER . .
RUN npm install


EXPOSE $PORT

CMD ["npm", "start"]
