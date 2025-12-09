# Pet Care API

# Documentation

![Documentation](docs/Documentation.md)

# Branching Strategy

![Branching Strategy](docs/Branches.md)

# Development

- Handlers Information : [HandlersInfo.md](docs/HandlersInfo.md)

## Setps To push to code from code space to git pre/beta
Step 1 :Check the remote version using the below command

- git remote -v

You should see something like:
origin https://github.com/PetCarePlus/pet-care-client (fetch)

origin https://github.com/PetCarePlus/pet-care-client (push)

if it’s not that then set the URL using below command :

- git remote set-url origin https://github.com/PetCarePlus/pet-care-client.git

Step2 : By default Codespace will clone only one branch to clone all the branches use the below command
- git fetch --all

Step 3: You will now have access to all the branches to list them use this command
- git branch -r
  
Step 4: Make a local branch on code space using the below command replace the branch name with your branch
- git checkout -b 002-kumara origin/002-kumara

Change the one in Italic with your branch names try to give the same names so while commiting it wont cause issues


Step 5: Now commit the changes into your local branch and push them

- git add —all
- git commit -m “commit Message”
- git push


Step 6: Now push the changes from your remote branch to pre/beta

- git pull origin pre/beta

- git push:

- git checkout pre/beta
- git pull origin pre/beta
- git merge origin 002-kumara
- git push origin pre/beta
