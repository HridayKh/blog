# source code for blogs.hriday.tech

# design:

## basic function:

### **Get**			TODO: IMAGE
- **Blog Viewing:**
  - Get Blog Count  					✅✔️
  - Get blogs by date, count and offset ✅✔️
  - Get specific blog by id				✅✔️
- **Tags with Blogs:**
  - Get blogs by tags					✅✔️
- **Blog Images:**
  - Get public image link

### **Create**  	TODO: IMAGE
- **Blogs:**  
  - Create Blogs						✅✔️
- **Blog Images:**
  - Add images
- **Tags:**
  - Create tags

### **Update**
- **Blogs:**
  - Edit blogs
- **Tags:**
  - Edit tags
- **Tags with Blogs:**
  - Assign tags to blogs

### **Delete/Archive**
- **Blogs:**
  - Archive blogs (no deleting blogs ever)
- **Blog Images:**
  - Remove images
- **Tags:**
  - Remove tags

## entities:

### blog entity:

#### blog parts:
- title
- subtitle
- tagline
- content (blog content is mdx)
- tags
- images (can be uploaded septerately and then refered to)
- date

#### blogs db:
- id (in format of b1, b2, b3, ... instead of just int)
- title
- subtitle
- tagline
- content
- tags (json array format for tag ids due to json is easy parse, ex: ["t1", "t2", "t3"] where t1, t2, t3 are tag ids)
- publish_date
- archived

### tag entity:

#### tag parts:
- name
- color

#### tag db:
- id (in format of t1, t2, t3, ... instead of just int)
- name
- hex (ccolor in hex format with `#` included, ex: `#ff0000` instead of just `ff0000`)

### image entity:

#### image parts:
- name
- alt

#### image db:
- id (in format of i1, i2, i3, ... instead of just int)
- name
- alt

## future functions:
- schedule publish
- viewer/user accounts
- comments
- view, like/dislike, share counter
- analytics
- search
- blog series
- blog drafts