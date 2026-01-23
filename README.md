# BijaLapa Natural Website

This is the preview for the bijalapa.com website

BijaLapa Natural is a eco-rural lodging located in the town of Bijagual, in the Central Pacific coast of Costa Rica.

## Technologies Used

- Modern React
- Typescript
- Markdown (for written content)
- Plain CSS / CSS Modules
- TailwindCSS / daisyUI / Typography Plugin
- Figma Design Tool
- Tanstack Start for React / Vite
- Tanstack React Router
- Tanstack React Query (...yes I drank the kool-aid)
- Cloudflare Workers
- Axios HTTP Client
- AWS SDK / S3-Client / Cloudflare R2 Object Storage

- Zod Schema Validation
- Immer for Inmutable State (if needed)
- ExifReader

```
BijaLapa Natural Menu

   View Rooms
     Guarumo
     Sunrise

   The Grounds
     The Yard
     Ranch Area
     Organic Practices

     // Rural Work

   Where to Eat What to Do
	  Restaurants
	  Hiking (Hike to La Poza, Hike to Bijagual Waterfall)

    //Fogata Night
	  //The Town of Bijagual and Sorroundings
	  // Horseback Tours
	  // Crocodile Tours (One-hour drive or less)

   Scarlet Macaw Habitat Project
	  One Hundred Trees a Year (and Counting)
	  Wildlife Journal

   Local Partners

   Contact

   About Us

Routes:

/page
/category/page
/category/page/[unit | item]

/ <show photoStory>

/rooms <show photoStory>
/rooms/guarumo
/sunrise

/grounds <show photoStory>
/grounds/yard
/grounds/ranch
/grounds/organic

/eat-do <show photoStory>
/eat-do/restaurants
/eat-do/hiking
/eat-do/fogata-night
/eat-do/bijagual

/habitat <show photoStory>
/habitat/wildlife
/habitat/trees

/contact
/about-us
/terms-and-conditions
```

cluster stacks

views
rooms
[guarumo]
[sunrise]
yard
ranch
organic
restaurant
[sudy]
[martas]
[loit]
hiking
trees
wildlife

cluster mix

mx_home
mx-rooms
mx-grounds
mx-yard
mx-ranch
mx-organic
mx-eat-do
mx-sudy
mx-martas
mx-loit
mx-hiking
mx-habitat
mx-trees
mx-wildlife

hero
home
category
view-rooms
grounds
activities
sm-habitat
page
guarumo
sunrise
yard
ranch
organic

cluster: {
cluster_id: uuid,
title: home,
type: root | cate | page
}

[{
image_id: uuid,
clusters: [cluster_id, cluster_id,...]
}]

root
home
actividades
grounds
activities
sm-habitat
local-partners
...etc

activities
restaurants
fogata-night
la-poza
...etc

page

home
la-poza
organic

page
name: home
route: "/home"
cluster: [uuid1, uuid2, uuid3,...]

name: "activities"
route "/activities"
cluster: "

```
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/efgarro/2025v12-BLN-Website.git
git push -u origin main
```

server functions
loaders
middleware - request / server fn

## Upload \*.md files to R2 using wrangler CLI

```sh
/c/00-IdearApps/2025v12-BLN-Website/.git/hooks/post-merge

npx wrangler r2 object put --remote 2025v12-bijalapa/prose/"$(basename "/c/00-IdearApps/2025v12-BLN-Website/src/prose/about.md")" --file "/c/00-IdearApps/2025v12-BLN-Website/src/prose/about.md"
```

### How can I exclude a config file from git merge a branch

```js
git merge --no-commit <branch name>

git checkout HEAD -- /c/00-IdearApps/2025v12-BLN-Website/src/apiFns/apiFns.ts

```
