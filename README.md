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
     We are Organic
     Rural Work

   Activities
	  Local Restaurants
	  Hiking
	  Fogata Night
	  Hike to La Poza
	  Hike to Bijagual Waterfall
	  The Town of Bijagual and Sorroundings
	  Horseback Tours
	  Crocodile Tours (One-hour drive or less)

   Scarlet Macaw Habitat Project
	 Wildlife Journal
	 One Hundred Trees a Year (and Counting)

   Local Partners

   Contact

   About Us

Routes:

/page
/category/page
/category/page/[unit | item]

/home <show photoStory>

/view-rooms <show photoStory>
/view-rooms/guarumo
/view-rooms/sunrise

/grounds <show photoStory>
/grounds/yard
/grounds/ranch
/grounds/organic
/grounds/work

/activities <show photoStory>
/activities/restaurants
/activities/hiking
/activities/fogata-night
/activities/la-poza
/activities/waterfall
/activities/horseback
/activities/bijagual
/activities/croc-tour

/sm-habitat <show photoStory>
/sm-habitat/wildlife
/sm-habitat/trees

/local-partners
/contact
/about-us
/terms-and-conditions
```

cluster types

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