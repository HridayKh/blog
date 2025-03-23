# source code for blogs.hriday.tech

# design:

## future functions:
- schedule publish
- viewer/user accounts
- comments
- view, like/dislike, share counter

## basic function:

### blog management:
- add blogs
- edit blogs
- archive blogs (no deleting blogs ever)

### blog viewing:
- search blogs
- get specific amoutn of blogs by sorting
- get specific blog
- get blog cards (card is just the title, image, link, and a short description)

### blog images:
- add images
- remove images
- get images

### tags:
- create tags
- rename tags
- remove tags

### tags with blogs:
- assign tags to blogs
- get blogs by tags

## blog entity:

### blog parts:
- title
- subtitle
- tagline
- content (blog content is mdx)
- tags
- images (can be uploaded septerately and then refered to)
- date

### blogs db:
- id (in format of b1, b2, b3, ... instead of just int)
- title
- subtitle
- tagline
- content
- tags (json array format for tag ids due to json is easy parse, ex: ["t1", "t2", "t3"] where t1, t2, t3 are tag ids)
- publish_date
- archived

## tag entity:

### tag parts:
- name
- color

### tag db:
- id (in format of t1, t2, t3, ... instead of just int)
- name
- hex (ccolor in hex format with `#` included, ex: `#ff0000` instead of just `ff0000`)

## image entity:

### image parts:
- name
- alt

### image db:
- id (in format of i1, i2, i3, ... instead of just int)
- name
- alt
