# WEB TECHNOLOGY — EXAM PREPARATION NOTES

# Internet Basics & HTML

---

## Question 1: What is an IP address?

### Answer
An **IP Address (Internet Protocol Address)** is a unique numerical identifier assigned to every device (computer, phone, server, printer) participating in a computer network that uses the Internet Protocol.

It performs two primary functions:
1. **Host Identification**: It uniquely distinguishes a specific device from every other device on the network.
2. **Location Addressing**: It provides the network routing path so that routers can navigate data packets to that exact machine.

#### Types and Formats of IP Addresses:
- **IPv4 (Internet Protocol Version 4)**:
  - Consists of **32 bits** (4 bytes).
  - Written in **dotted-decimal notation** as four numbers separated by dots (e.g., `192.168.1.10` or `142.250.190.46`).
  - Each of the four numbers can range from **0 to 255**.
  - Total available addresses: approximately **4.3 billion**.
- **IPv6 (Internet Protocol Version 6)**:
  - Consists of **128 bits**.
  - Written in **hexadecimal format** separated by colons (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).
  - Created to solve the global exhaustion of IPv4 addresses.

### Working Examples
- **Private IP (Local Wi-Fi Network)**: When you connect to your home or office Wi-Fi, your laptop is assigned a local private address such as `192.168.1.15`.
- **Public IP (Internet Web Server)**: A public web server (such as Google or an examination portal) is routed across the Internet using a public address such as `172.217.16.206`.

---

## Question 2: Apply your understanding of IP addressing to explain how unique IPs are assigned to systems and how they enable Internet communication.

### Answer

#### 1. How Unique IP Addresses are Assigned
Systems receive unique IP addresses through two main techniques:

- **Dynamic Assignment via DHCP (Dynamic Host Configuration Protocol)**:
  This is the automatic method used by phones, laptops, and college lab computers. When a device joins a network, it performs the **DORA** sequence:
  1. **Discover**: The device broadcasts a message asking, *"Is there a DHCP server here? I need an IP address."*
  2. **Offer**: The local router/DHCP server offers an unused IP address (e.g., `192.168.1.25`) with a lease duration.
  3. **Request**: The device replies that it accepts the offered IP.
  4. **Acknowledge**: The server confirms the lease and registers the device.
- **Static (Manual) Assignment**:
  A network administrator manually configures a fixed IP address in the operating system's network settings. This is essential for web servers, database servers, and network printers so their address never unexpectedly changes.
- **NAT (Network Address Translation)**:
  Within homes and institutions, devices use **Private IPs** (like `192.168.x.x`). The main router uses NAT to translate all these private internal addresses into a single **Public IP** provided by the Internet Service Provider (ISP), preserving global addresses.

#### 2. How IP Addressing Enables Internet Communication
Communication over the Internet relies on **Packet Switching** governed by the **Source** and **Destination** IP addresses:

1. **Packet Header Addressing**: When you request a webpage, your computer splits the message into packets. Each packet header is stamped with:
   - **Source IP**: Identifies the sender (where the reply must go).
   - **Destination IP**: Identifies the target web server.
2. **Default Gateway Hand-off**: If the destination IP is outside your local network, your computer hands the packet to the local router (Default Gateway).
3. **Hop-by-Hop Routing**: Internet backbone routers read the Destination IP, check internal **Routing Tables**, and forward the packet from router to router across the fastest paths.
4. **Target Delivery & Response**: The destination web server unpacks the packet, prepares the webpage response, sets your IP as the new destination, and sends the response back to your device.

### Example
When you search on Google from your college lab:
- Your computer (`192.168.1.45`) receives its IP via DHCP.
- When you submit the search, your computer writes `Source IP = 192.168.1.45` and `Destination IP = 142.250.190.46` (Google).
- The router applies NAT to send it across the public Internet.
- Google reads the source IP and delivers the search results back to your machine.

### Diagram

![Step 1: Client Creates Packet (HTTP GET Request)](assets/images/diagrams/step1_client_packet.jpg)

---

## Question 3: Explain Internet server identities.

### Answer
An **Internet Server Identity** consists of the identifiers that allow any client computer in the world to locate, authenticate, and access a specific server application on the Internet.

It operates across three distinct levels:
1. **Domain Name (Human Identity)**:
   - A memorable alphanumeric alias (e.g., `www.university.edu`).
   - Organized in a hierarchical structure: Top-Level Domain (TLD like `.edu`), Domain Name (`university`), and Subdomain (`www`).
   - Translated into an IP address by the **Domain Name System (DNS)**.
2. **IP Address (Machine / Routing Identity)**:
   - The numerical network address (e.g., `192.0.2.1`).
   - Routers only understand numerical IP addresses when forwarding packets across the physical Internet.
3. **Port Number (Service / Application Identity)**:
   - A single physical server machine often runs several services simultaneously (a Web Server, an Email Server, and a File Server).
   - Port numbers direct incoming requests to the correct running program:
     - **Port 80**: Standard Web (HTTP)
     - **Port 443**: Secure Encrypted Web (HTTPS)
     - **Port 25**: Email Transmission (SMTP)
     - **Port 21**: File Transfer (FTP)

### Example
When you access `https://www.college.edu`:
- The browser looks up the domain `www.college.edu` in DNS and gets `203.0.113.50`.
- The `https://` protocol tells the browser to connect to **Port 443**.
- The full identity reached is `203.0.113.50:443`.

### Diagram

![Internet Server Identity Resolution (Domain Name → IP Address → Port Number → Target Web Server)](assets/images/diagrams/step2_server_identity.jpg)

### Exam-Ready Answer
> An **Internet Server Identity** represents the combination of identifiers that uniquely specify a server and its hosted services on the global network:
>
> 1. **Domain Name (Symbolic Identity)**: A human-readable alphanumeric name (such as `www.google.com`) registered with a domain registrar. The Domain Name System (DNS) maps this name to the server's numeric IP.
> 2. **IP Address (Network Layer Identity)**: A globally unique public numerical address (IPv4 or IPv6) assigned to the server's network interface. Internet routers inspect this address to navigate packets to the physical hardware.
> 3. **Port Number (Application Layer Identity)**: A 16-bit number that specifies which application daemon on the server should handle incoming traffic (e.g., Port 80 for HTTP, Port 443 for HTTPS, Port 21 for FTP).


---

## Question 4: Explain the structure of the Internet and the various methods through which communication takes place over it, with suitable examples.

### 1. Introduction
The Internet is a worldwide network that connects millions of computers, mobile phones, servers and other devices.  
It allows users to communicate and share information such as web pages, emails, files, videos and messages.

In simple words:
> **Internet = Network of interconnected networks.**

---

### 2. Structure of the Internet
The Internet consists of several important components:

#### 1. Client
A client is a device that requests information or services from another computer.  
**Examples:**
- Laptop
- Mobile phone
- Desktop computer  

*For example, when you open Google on your mobile, your mobile acts as a client.*

#### 2. Server
A server is a computer that stores and provides information or services to clients.  
**Examples:**
- Web server
- Email server
- File server  

*For example, when you request a webpage, the web server sends that webpage to your browser.*

#### 3. Internet Service Provider (ISP)
An ISP provides Internet connectivity to users.  
**Examples:**
- Jio
- Airtel
- BSNL  

Your device connects to the Internet through an ISP.

#### 4. Routers
A router is a networking device that forwards data from one network to another.  
It helps data find a suitable path from the source device to the destination.

#### 5. Communication Links
Different devices and networks are connected through communication links such as:
- Fiber-optic cables
- Wireless networks
- Mobile networks
- Undersea cables

---

### 3. How Communication Takes Place on the Internet
Internet communication mainly follows the **client-server model**.

The basic process is:

![Internet Communication Flow (Client / Browser → ISP → Routers → Internet → Web Server → Response)](assets/images/diagrams/step3_client_server_flow.jpg)

#### Example
Suppose you type `www.example.com` in your browser.

The basic process is:
- **Step 1:** The browser sends a request.
- **Step 2:** The request travels through the user's network and ISP.
- **Step 3:** Routers forward the data toward the destination server.
- **Step 4:** The web server receives the request.
- **Step 5:** The server processes the request and sends the required webpage back.
- **Step 6:** The browser receives the data and displays the webpage.

---

### 4. Role of TCP/IP in Internet Communication
Internet communication mainly uses the **TCP/IP protocol suite**.

#### IP — Internet Protocol
IP is responsible for addressing and routing.  
It helps identify the source and destination of data.

For example:

![Direct IP Communication over the Internet](assets/images/diagrams/step4_ip_direct_flow.jpg)

So, **IP helps data reach the correct destination.**

#### TCP — Transmission Control Protocol
TCP provides reliable communication. It ensures that data:
- Reaches the destination correctly.
- Is received in the proper order.
- Missing data can be retransmitted.
- The complete message can be reconstructed.

**Simple example:**  
Suppose a webpage is divided into several pieces:  
`Data → 1   2   3   4   5`  
If piece 3 is lost during transmission, TCP can detect the problem and arrange for the missing data to be sent again.

Therefore:
- **IP** = Addressing and Routing
- **TCP** = Reliable Delivery

---

## Question 5: Interpret the practical use of HTML lists, images, and tables in website development.

### 1. Introduction
HTML provides different elements to organize and present information on a webpage.  
Three commonly used elements are:
- **Lists** → organize related items.
- **Images** → display visual information.
- **Tables** → arrange data in rows and columns.

These elements make a webpage clear, organized and easier to understand.

---

### 2. HTML Lists
HTML lists are used to display a group of related items.  
There are three main types of lists:

#### A. Unordered List
An unordered list displays items using bullets.  
It uses:
- `<ul>` → Unordered List
- `<li>` → List Item

**Example:**
```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

**Output:**

- HTML
- CSS
- JavaScript

**Practical use:**  
Used for navigation menus, features, requirements and general lists.

#### B. Ordered List
An ordered list displays items using numbers or letters.  
It uses:
- `<ol>` → Ordered List
- `<li>` → List Item

**Example:**
```html
<ol>
    <li>Open the browser</li>
    <li>Enter the website address</li>
    <li>Press Enter</li>
</ol>
```

**Output:**
1. Open the browser
2. Enter the website address
3. Press Enter

**Practical use:**  
Useful when the order of items is important, such as instructions, steps and procedures.

#### C. Definition List
A definition list is used to display a term and its description.  
It uses:
- `<dl>` → Definition List
- `<dt>` → Definition Term
- `<dd>` → Definition Description

**Example:**
```html
<dl>
    <dt>HTML</dt>
    <dd>Language used to create webpage structure.</dd>

    <dt>CSS</dt>
    <dd>Used to style webpages.</dd>
</dl>
```

**Output:**

<dl>
    <dt>HTML</dt>
    <dd>Language used to create webpage structure.</dd>
    <dt>CSS</dt>
    <dd>Used to style webpages.</dd>
</dl>

**Practical use:**  
Useful for glossaries, definitions and term descriptions.

---

### 3. Adding Images to HTML
Images are used to make webpages more attractive and informative.  
The `<img>` tag is used to display an image.

#### Syntax
```html
<img src="photo.jpg" alt="My Photo" width="300" height="200">
```


#### Example
```html
<img src="college.jpg" alt="College Building" width="300" height="200">
```
*The browser displays the specified image on the webpage.*

#### Practical Uses of Images
Images can be used for:
- College or company logos
- Product pictures
- Diagrams
- Educational illustrations
- Photographs
- Website banners

---

### 4. HTML Tables
HTML tables are used to display data in rows and columns.  
Important table tags include:
- `<table>` → Creates the table
- `<tr>` → Creates a table row
- `<th>` → Creates a heading cell
- `<td>` → Creates a data cell

#### Example
```html
<table border="1">
    <tr>
        <th>Name</th>
        <th>Marks</th>
    </tr>
    <tr>
        <td>Rahul</td>
        <td>85</td>
    </tr>
    <tr>
        <td>Aman</td>
        <td>90</td>
    </tr>
</table>
```

#### Output
| Name | Marks |
| :--- | :--- |
| Rahul | 85 |
| Aman | 90 |

#### Practical Uses of Tables
Tables are useful for displaying:
- Student marks
- Examination schedules
- Timetables

---

## Question 6: Explore the various attributes of a table in HTML by providing a suitable example in detail.

### Answer

#### Core Table Attributes & Descriptions:

| Attribute | Meaning & Purpose |
| :--- | :--- |
| **`border`** | Sets the thickness of the table and cell outline borders in pixels (e.g., `border="2"`). |
| **`width`** | Sets the horizontal width of the table in pixels or percentage of the screen (e.g., `width="80%"`). |
| **`cellpadding`** | Distance in pixels between the cell border and the content inside the cell. |
| **`cellspacing`** | Distance in pixels separating adjacent cells from each other. |
| **`bgcolor`** | Sets the background color of the entire table, a specific row (`<tr>`), or an individual cell (`<td>`). |
| **`align`** | Controls the horizontal alignment of the table on the page (`left`, `center`, `right`). |
| **`colspan="N"`** | Merges $N$ adjacent columns horizontally into a single wider cell. |
| **`rowspan="N"`** | Merges $N$ adjacent rows vertically into a single taller cell. |

### Visualizing Cellpadding vs Cellspacing

![HTML Table Cellpadding vs Cellspacing](assets/images/diagrams/table_cellpadding_cellspacing.svg)

### Visualizing `colspan` and `rowspan`

![HTML Table Colspan and Rowspan](assets/images/diagrams/table_colspan_rowspan.svg)

### Example

```html
<table border="1" width="60%" cellpadding="10" cellspacing="5" align="center" bgcolor="lightblue">
  <tr>
    <!-- colspan merges 2 columns horizontally -->
    <th colspan="2">Student Info</th>
  </tr>
  <tr>
    <!-- rowspan merges 2 rows vertically -->
    <td rowspan="2">MCA</td>
    <td>Rahul</td>
  </tr>
  <tr>
    <td>Aman</td>
  </tr>
</table>
```

**Output:**

<table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; text-align: center;">
  <tr style="background-color: lightblue;">
    <th colspan="2">Student Info</th>
  </tr>
  <tr>
    <td rowspan="2" style="background-color: #f1f5f9; font-weight: bold;">MCA</td>
    <td>Rahul</td>
  </tr>
  <tr>
    <td>Aman</td>
  </tr>
</table>

---

# Linking, Frames, CSS & JavaScript

---

## Question 7: Define a hyperlink in HTML with syntax.

A **Hyperlink** is an HTML element that links to another document, another location within the same document, an image, or a downloadable file.

In HTML, hyperlinks are created using the **Anchor tag**: `<a>`. The destination address is provided through the **`href` (Hypertext Reference)** attribute.

### Syntax
```html
<a href="URL_destination">Clickable Link Text</a>
```

### Example

```html
<a href="https://www.youtube.com" target="_blank">Visit YouTube</a>
```

**Output:**

<p><a href="https://www.youtube.com" target="_blank">Visit YouTube</a></p>

When a user clicks the words **"Visit YouTube"**, the browser navigates to `https://www.youtube.com`.

### How It Works
1. The user clicks on the text inside the `<a>` tag.
2. The browser inspects the `href` attribute.
3. The browser sends an HTTP request to that URL.
4. The destination webpage opens in the browser.

### Diagram

![How a Hyperlink Works: From Click to Page Load](assets/images/diagrams/hyperlink_navigation_flow.svg)

---

## Question 8: Compare internal linking and external linking techniques in terms of usability, performance, and user experience with example.

### Creative Concept & Real-World Analogy

Think of using **Netflix** or walking inside a **University Campus**:
- **Internal Linking (In-House Navigation)**:
  - *Analogy*: Moving between *"Home"*, *"Trending"*, and *"My Watchlist"* inside Netflix, or walking from the *Lecture Hall* to the *Library* inside the college campus.
  - *Experience*: You stay under the same roof! The audio keeps playing, your session stays logged in, and navigation is instant.
- **External Linking (Stepping Out into the World)**:
  - *Analogy*: Tapping a link inside Netflix that says *"Listen to Soundtrack on Spotify"* or stepping outside your campus gate to hail a taxi to the *City Science Museum*.
  - *Experience*: You leave the original building entirely. Your device connects to an external server, navigates through city traffic (DNS queries and routers), and opens a completely new territory.

---

### Comparison Table (Usability, Performance, User Experience)

| **Basis** | **Internal Linking** | **External Linking** |
| :--- | :--- | :--- |
| **Meaning** | Connects pages, documents, or bookmarks located on the **same website / domain**. | Connects visitors to a resource hosted on a **foreign third-party website / external domain**. |
| **URL Mechanism** | Uses **Relative URLs** (e.g., `href="hall-ticket.html"`) or fragment IDs (`href="#syllabus"`). | Uses **Absolute URLs** with full protocol and domain (e.g., `href="https://www.youtube.com"`). |
| **Usability** | **Smooth Hierarchy**: Guides users seamlessly through menus, chapters, and dashboards without friction. | **Resource Enrichment**: Provides supplementary citations, official standards, or video references. |
| **Performance** | **Blazing Fast**: Reuses cached stylesheets, fonts, and scripts. Requires **zero** new DNS lookups. | **Higher Latency**: Incurs a new DNS lookup, TCP 3-way handshake, and remote asset download. |
| **User Experience** | **Preserves Focus**: Student remains immersed inside the portal with zero context-switching. | **Navigates Away**: Best practice uses `target="_blank"` so the visitor doesn't lose the original tab. |
| **Example** | `<a href="hall-ticket.html">Download Hall Ticket</a>` | `<a href="https://www.youtube.com" target="_blank">Watch on YouTube ↗</a>` |

---

### Working Code Examples

#### 1. Internal Link (Campus Portal Navigation)
Navigates the user to another page on the same web server using a relative path:

```html
<a href="hall-ticket.html">🎟️ Download Hall Ticket</a>
```

**Output:**

<p><a href="hall-ticket.html">🎟️ Download Hall Ticket</a></p>

#### 2. External Link (Third-Party Reference)
Connects the user to an external domain and opens securely in a new tab:

```html
<a href="https://www.youtube.com" target="_blank">▶️ Watch Lecture on YouTube ↗</a>
```

**Output:**

<p><a href="https://www.youtube.com" target="_blank">▶️ Watch Lecture on YouTube ↗</a></p>

---

### Visual Comparison

![Internal Linking vs External Linking](assets/images/diagrams/internal_vs_external_linking.svg)

---

## Question 9: Write the tag used to define the internal link with syntax.

### Creative Concept
Think of an **Express Elevator button in a skyscraper** or **Wikipedia's Table of Contents**:
Instead of manually scrolling through hundreds of paragraphs of reading material, an **Internal Bookmark Link** instantly teleports the reader's screen directly to a specific section on the exact same webpage.

### Tag & Syntax
Internal linking uses the standard **Anchor tag (`<a>`)**, where the **`href`** attribute references an element's **`id`** preceded by a hash symbol (**`#`**).

#### The Two-Step Mechanism:
1. **Step 1 — Mark Destination**: Give a unique `id` attribute to the target element:
   ```html
   <h2 id="syllabus">Course Syllabus</h2>
   ```
2. **Step 2 — Create Jump Link**: Set `href` to `#` followed by the matching `id`:
   ```html
   <a href="#syllabus">⚡ Jump to Course Syllabus</a>
   ```

---

### Working Example

```html
<!-- Clickable Jump Link -->
<p><a href="#exam-tips">⚡ Jump to Exam Tips</a></p>

<!-- Target Section on the same page -->
<h3 id="exam-tips">📌 Important Exam Tips</h3>
<p>Always practice writing HTML tags and tables by hand for the exam!</p>
```

**Output:**

<p><a href="#exam-tips">⚡ Jump to Exam Tips</a></p>
<h4 id="exam-tips" style="margin-top: 10px; color: #1e293b;">📌 Important Exam Tips</h4>
<p style="margin: 0; color: #475569; font-size: 13px;">Always practice writing HTML tags and tables by hand for the exam!</p>

---

## Question 10: Describe the use of Images as Hyperlinks in HTML.

An **image can be used as a hyperlink** in HTML. When the user clicks the image, it takes them to another webpage, file, or location.

The **`<a>` (anchor) tag** is used to create the hyperlink, and the **`<img>` tag** is placed inside it.

### Syntax

```html
<a href="destination.html">
    <img src="image.jpg" alt="Image">
</a>
```

### Example

```html
<a href="home.html">
    <img src="logo.jpg" alt="College Logo" width="150">
</a>
```

Here, clicking the **college logo** opens `home.html`.

### Uses

- **Website logo** → Opens the home page.
- **Product image** → Opens product details.
- **Image/icon** → Opens another webpage or resource.

### Diagram

![Image as Hyperlink Flow](assets/images/diagrams/image_as_hyperlink.svg)

### 🧠 Remember

- **`<a>` = Link 🔗**  
- **`<img>` = Image 🖼️**  
- **`<a>` + `<img>` = Image Hyperlink**

---

## Question 11: Evaluate the effectiveness of frames in webpage design. Justify whether frames should be used in modern web development with proper reasoning.

### Simple Explanation
Frames were used in older HTML to divide a webpage into different sections. For example, one section could contain a menu and another section could display the content.

### Example
```html
<frameset cols="25%,75%">
    <frame src="menu.html">
    <frame src="content.html">
</frameset>
```

### Visual Layout

![Frameset Layout](assets/images/diagrams/frameset_layout.svg)

### Advantages of Frames
- Navigation menu could remain visible.
- Only one section needed to reload.
- Useful for older websites with simple layouts.

### Disadvantages of Frames
- Difficult to bookmark individual pages.
- Can cause problems with the Back button.
- Not suitable for mobile and responsive design.
- Creates navigation and SEO problems.

### Should Frames Be Used Today?

> 🚫 **VERDICT: NO.**  
> Frames should **not** be used in modern web development because they are **obsolete** and not suitable for responsive websites.  
>  
> 💡 **What to use instead:**  
> Modern websites use **CSS, Flexbox, and Grid** for page layouts. The **`<iframe>`** tag is different and is still used when embedding content such as videos or maps.

---

## Question 12: Make use of Cascading Style Sheets (CSS) to design an HTML page containing headings, paragraphs, and lists with different styles.

### Simple Concept
Cascading Style Sheets (CSS) is used to style and format HTML elements. Embedded (Internal) CSS is written inside the `<style>` tag within the `<head>` section to define custom colors, alignment, and fonts for headings, paragraphs, and lists.

### HTML and CSS Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Example</title>

    <style>
        h1 {
            color: blue;
            text-align: center;
        }

        p {
            color: green;
            font-size: 18px;
        }

        ul {
            color: red;
        }
    </style>
</head>

<body>

    <h1>My Web Page</h1>

    <p>This is a paragraph styled using CSS.</p>

    <h2>My Subjects</h2>

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

</body>
</html>
```

### Rendered Output

<div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; background-color: #ffffff; max-width: 500px; margin: 15px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06); font-family: Arial, sans-serif;">
  <h1 style="color: blue; text-align: center; margin: 0 0 16px 0; font-size: 26px;">My Web Page</h1>
  <p style="color: green; font-size: 18px; margin: 0 0 16px 0;">This is a paragraph styled using CSS.</p>
  <h2 style="color: #000000; margin: 0 0 10px 0; font-size: 20px;">My Subjects</h2>
  <ul style="color: red; margin: 0; padding-left: 24px; font-size: 16px; line-height: 1.6;">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
</div>

### Code Explanation

| Element / Selector | CSS Rule / Attribute | Applied Effect / Purpose |
| :--- | :--- | :--- |
| **`h1`** | `color: blue; text-align: center;` | The main heading text turns **blue** and aligns in the **center** of the screen. |
| **`p`** | `color: green; font-size: 18px;` | The paragraph text turns **green** with a larger **18px** font size. |
| **`ul`** | `color: red;` | The bulleted list and all its list items (`<li>`) turn **red**. |
| **`<h2>`** | *(Default browser styling)* | Renders with the browser's default heading style because no custom CSS was targeted at `h2`. |
| **`<style>` Tag** | Embedded inside `<head>` | Declares an **Internal (Embedded) Style Sheet** used specifically within this webpage. |

---

## Question 13: Which type of Cascading Style Sheet is used within a web page?

### Answer: Internal CSS (Embedded CSS)

Internal CSS is a type of Cascading Style Sheet that is written within the HTML web page itself. It is placed inside the `<style>` tag, usually within the `<head>` section of the HTML document.

### Example:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: blue;
            text-align: center;
        }

        p {
            color: green;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>My Web Page</h1>
    <p>This is an example of Internal CSS.</p>
</body>
</html>
```

**Output:**

<div class="rendered-page-preview" style="padding: 1.25rem; background: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
  <h1 style="color: blue; text-align: center; margin: 0 0 0.75rem 0; font-size: 1.35rem; font-family: sans-serif;">My Web Page</h1>
  <p style="color: green; font-size: 18px; margin: 0; font-family: sans-serif; text-align: center;">This is an example of Internal CSS.</p>
</div>

---

## Question 14: Make use of Embedded Style Sheet with appropriate description, syntax and program in HTML.

### Answer

### 1. Syntax

```html
<head>
    <style>
        selector {
            property: value;
        }
    </style>
</head>
```

For example:

```css
h1 {
    color: blue;
}
```

Here:

- `h1` → Selector
- `color` → Property
- `blue` → Value

---

### 2. Simple HTML Program

```html
<!DOCTYPE html>
<html>

<head>
    <title>Embedded CSS</title>

    <style>
        h1 {
            color: blue;
            text-align: center;
        }

        p {
            color: green;
            font-size: 18px;
        }

        body {
            background-color: lightgray;
        }
    </style>

</head>

<body>

    <h1>My Web Page</h1>

    <p>This is an example of Embedded CSS.</p>

</body>

</html>
```

**Output:**
<div class="rendered-page-preview" style="background-color: lightgray; padding: 24px 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.08); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
  <h1 style="color: blue; text-align: center; margin: 0 0 12px 0; font-family: sans-serif; font-size: 26px;">My Web Page</h1>
  <p style="color: green; font-size: 18px; margin: 0; font-family: sans-serif; text-align: center;">This is an example of Embedded CSS.</p>
</div>

---

### 3. Explanation

1. `<style>` is used to write CSS inside the HTML page.
2. `h1` changes the **colour and alignment** of the heading.
3. `p` changes the **colour and size** of the paragraph.
4. `body` changes the **background colour** of the page.
5. All CSS rules are written inside the `<head>` section.

---

### 4. Advantages

- Easy to use for a **single web page**.
- No separate CSS file is required.
- Multiple HTML elements can be styled at once.
- Makes the webpage more attractive and readable.

---

## Question 15: How does JavaScript support event-driven programming?

### Answer:

#### 1. Definition
Event-driven programming is a programming approach where the program responds to events performed by the user or the browser.  
JavaScript supports event-driven programming by using **events** and **event handlers**.

Examples of events are:
- Mouse click
- Keyboard press
- Mouse movement
- Form submission
- Page loading

#### 2. Syntax
```javascript
element.addEventListener("event", function() {
    // code to execute
});
```

#### 3. Simple Program
```html
<!DOCTYPE html>
<html>

<body>

    <button id="btn">Click Me</button>

    <script>
        document.getElementById("btn").addEventListener("click", function() {
            alert("Button Clicked!");
        });
    </script>

</body>

</html>
```

#### 4. Explanation
- `click` is an event.
- `addEventListener()` waits for the event.
- When the user clicks the button, the function is executed.
- An alert message is displayed.

#### 5. Real-Life Example
In an online shopping website, when a user clicks the "Add to Cart" button, JavaScript detects the click event and adds the product to the shopping cart.

---

## Question 17: Explain the role of the Math Object in JavaScript with any one method example.

### Answer:

### 1. Definition

The **Math Object** in JavaScript is a built-in object used to perform **mathematical calculations**. It provides different properties and methods for performing calculations easily.

### 2. Syntax

```javascript
Math.method(value);
```

For example:

```javascript
Math.sqrt(25);
```

### 3. One Method Example – `Math.sqrt()`

The **`Math.sqrt()`** method is used to find the **square root** of a number.

### 4. Simple Program

```javascript
let num = 25;

let result = Math.sqrt(num);

console.log(result);
```

**Output:**
```text
5
```

### 5. Explanation

- `num` stores the value `25`.
- `Math.sqrt()` calculates its square root.
- `result` stores the answer.
- The output is `5`.

### 6. Real-Life Example

The Math Object can be used in **banking, shopping, games, engineering and educational applications** for mathematical calculations.

For example, a game can use mathematical calculations to calculate the distance between two objects.

### Conclusion

The **Math Object** makes mathematical calculations easier in JavaScript. Methods such as `sqrt()`, `round()`, `ceil()`, `floor()` and `random()` are commonly used in web applications.

---

## Question 18: Explain the properties and methods of the Math Object in JavaScript that are used in solving real-world computational problems.

### Simple Explanation
The `Math` object has two types of tools:
1. **Properties**: Fixed mathematical numbers (constants) that never change, like Pi ($\pi = 3.14159$).
2. **Methods**: Action formulas (functions) that calculate things, like rounding numbers, finding square roots, raising numbers to powers, or picking random numbers (like an OTP generator).

### Answer

#### 1. Key Mathematical Properties (Constants)

| Property | Mathematical Meaning | Value | Real-World Use |
| :--- | :--- | :--- | :--- |
| **`Math.PI`** | Ratio of circle circumference to diameter ($\pi$) | `3.14159...` | Calculating circle area: `Math.PI * r * r` |
| **`Math.E`** | Euler's constant (base of natural log) | `2.71828...` | Financial exponential growth calculations |
| **`Math.SQRT2`**| Square root of 2 | `1.414...` | Geometric diagonal calculations |

#### 2. Key Mathematical Methods

1. **Rounding Functions**:
   - `Math.round(x)`: Rounds to nearest integer (`Math.round(4.6) ➔ 5`).
   - `Math.floor(x)`: Rounds **down** unconditionally (`Math.floor(4.9) ➔ 4`). Used in age calculations and pagination.
   - `Math.ceil(x)`: Rounds **up** unconditionally (`Math.ceil(4.1) ➔ 5`). Used in delivery packaging boxes.
2. **Powers & Roots**:
   - `Math.pow(base, exp)`: Returns base raised to power exponent (`Math.pow(2, 3) ➔ 8`). Used in compound interest.
   - `Math.sqrt(x)`: Returns square root (`Math.sqrt(49) ➔ 7`). Used in distance formulas.
3. **Extremes**:
   - `Math.min(a, b, c...)` and `Math.max(a, b, c...)`: Finds smallest and largest values. Used in finding class toppers.
4. **Random Numbers**:
   - `Math.random()`: Returns a pseudo-random decimal between 0 and 1. Used in generating login OTPs and verification codes.

### Complete Program: Generating a 4-Digit Security OTP

```html
<!DOCTYPE html>
<html>
<head>
  <title>Real-World Math Object Demo</title>
</head>
<body>
  <h2>Exam Verification OTP Generator</h2>
  <button onclick="getOTP()">Generate 4-Digit OTP</button>
  <p id="otpResult" style="font-size: 20px; font-weight: bold; color: #4338ca;"></p>

  <script>
    function getOTP() {
      // Math.random() produces decimal [0 - 1)
      // Math.floor() strips decimals to yield an integer
      let otp = Math.floor(1000 + Math.random() * 9000);
      document.getElementById('otpResult').innerHTML = "Your One-Time Code: " + otp;
    }
  </script>
</body>
</html>
```

### Exam-Ready Answer
> The **Math Object** provides tools for real-world mathematical computing:
>
> 1. **Properties (Constants)**:
>    - `Math.PI`: Ratio of circle circumference to diameter ($\approx 3.14159$).
>    - `Math.E`: Euler's constant ($\approx 2.71828$).
> 2. **Methods (Computational Functions)**:
>    - `Math.round(x)`: Rounds to nearest integer.
>    - `Math.floor(x)` / `Math.ceil(x)`: Unconditionally rounds down / rounds up.
>    - `Math.pow(base, exp)`: Calculates exponential powers.
>    - `Math.sqrt(x)`: Computes square roots.
>    - `Math.min()` / `Math.max()`: Returns lowest and highest values among inputs.
>    - `Math.random()`: Generates random floating-point values between 0 and 1 (used for OTPs and randomized tokens).

### Quick Revision
> **REMEMBER:**
> • Properties: `Math.PI` and `Math.E`.
> • `Math.floor()` rounds down; `Math.ceil()` rounds up; `Math.round()` rounds to nearest.
> • `Math.pow(base, exp)` for powers; `Math.sqrt(x)` for roots; `Math.random()` for random values.

---

## Question 19: Describe Core Language objects with example.

### Answer

Core Language Objects in JavaScript are built-in objects that provide useful properties and methods for performing common tasks.

Some important core objects are:

#### 1. String Object
Used to work with text.

```javascript
let name = "IRONMAN";
console.log(name.length);
```

**Output:**
```
7
```

#### 2. Number Object
Used to work with numbers.

```javascript
let num = 25;
console.log(num);
```

**Output:**
```
25
```

#### 3. Array Object
Used to store multiple values in a single variable.

```javascript
let fruits = ["Apple", "Mango", "Banana"];
console.log(fruits[0]);
```

**Output:**
```
Apple
```

#### 4. Date Object
Used to work with date and time.

```javascript
let today = new Date();
console.log(today);
```

**Output:**
```
Displays current date and time
```

#### 5. Math Object
Used for mathematical calculations.

```javascript
let x = Math.sqrt(25);
console.log(x);
```

**Output:**
```
5
```

---

## Question 20: Explain the role of Arrays in JavaScript and justify their importance in handling multiple data elements efficiently in web applications.

### Answer:

#### 1. Definition
An **Array** in JavaScript is a collection used to store multiple values in a single variable. The values can be of the same or different data types.  
For example, instead of creating separate variables for three fruits, we can store them in one array.

#### 2. Syntax
```javascript
let arrayName = [value1, value2, value3];
```

**Example:**
```javascript
let fruits = ["Apple", "Mango", "Banana"];
```

#### 3. Simple Program
```javascript
let marks = [80, 75, 90, 85];

console.log(marks[0]);

for (let i = 0; i < marks.length; i++) {
    console.log(marks[i]);
}
```

**Output:**
```text
80
80
75
90
85
```

#### 4. Explanation
- `marks` is an array containing multiple values.
- `marks[0]` accesses the first element.
- Array index starts from `0`.
- `length` gives the total number of elements.
- A loop can be used to process all elements.

#### 5. Importance of Arrays
Arrays are important in web applications because they help to:
- Store multiple data elements in one variable.
- Organize related information.
- Access data easily using indexes.
- Process many values using loops.
- Add and remove data easily using methods like `push()` and `pop()`.

#### 6. Real-Life Example
In an online shopping website, products added to a shopping cart can be stored in an array:
```javascript
let cart = ["Shirt", "Shoes", "Watch"];
```

---

## Question 21: Write the HTML syntax used to create a Submit button in a form.

### Answer:
The **Submit button** in HTML is used to send the form data to the server address specified in the form's `action` attribute.

It is created using the `<input>` tag with `type="submit"`.

### Syntax:
```html
<input type="submit" value="Submit">
```

### Attributes:
- **`type="submit"`**: Specifies that the button submits the form data to the server.
- **`value="Submit"`**: Defines the text displayed on the button surface.

### Example:
```html
<form action="process.php" method="POST">
    Name: <input type="text" name="studentName">
    <input type="submit" value="Submit">
</form>
```


---

## Question 22: What are radio buttons in HTML forms?

### Answer:

**Radio buttons** are HTML form elements used when the user has to **select only one option** from a group of options.

They are created using:

```html
<input type="radio">
```

### Example:

```html
Gender:

<input type="radio" name="gender"> Male
<input type="radio" name="gender"> Female
```

Here, the user can select **only one** option.

### Uses:

- Selecting gender
- Selecting payment method
- Selecting Yes/No
- Selecting one answer in a question

### Real-Life Example:

In a form:

**Choose your payment method:**

○ UPI  
○ Cash  
○ Credit Card

The user can select **only one** payment method.

👉 **Remember:** Radio Button = **Only ONE choice** ✅

---

## Question 23: Compare text field and password field in forms.

### Simple Explanation
- **Text Field**: When you type your name or roll number, you want to see the letters clearly so you don't make a spelling mistake.
- **Password Field**: When you type your secret login PIN or password, someone standing behind you might look at your screen. So the browser hides what you type, replacing each letter with black dots (`••••••••`).

### Answer: Comparison Table

| Feature | Text Field | Password Field |
| :--- | :--- | :--- |
| **HTML Syntax** | `<input type="text" name="user">` | `<input type="password" name="pass">` |
| **Visual Display** | Characters appear as **plain readable text**. | Characters are **masked with dots or asterisks** (`••••`). |
| **Primary Purpose** | Capturing non-sensitive information (Name, City, Roll Number). | Capturing sensitive security credentials (Passwords, PINs). |
| **Shoulder-Surfing Protection** | None; visible to anyone viewing the screen. | **Protected**; conceals entered characters from onlookers. |
| **Data Transmission Note** | Transmitted as plaintext. | Still transmitted as plaintext unless encrypted using **HTTPS (SSL/TLS)**! |

### Example Code
```html
<form>
  <!-- Text field: text is visible -->
  <label for="uname">Username:</label>
  <input type="text" id="uname" name="username"><br><br>

  <!-- Password field: text is masked -->
  <label for="pword">Password:</label>
  <input type="password" id="pword" name="password">
</form>
```


---

## Question 24: Distinguish between single select and multi-choice select list elements and also create a program to demonstrate both and analyze the output.


### Answer: Comparison

| Feature | Single Select List | Multi-Choice Select List |
| :--- | :--- | :--- |
| **Syntax** | `<select name="city">` | `<select name="skills" multiple size="4">` |
| **Selection Limit** | Allows selecting **only 1 option**. | Allows selecting **multiple options** simultaneously. |
| **UI Display** | Closed dropdown showing 1 selected item with a down arrow. | Open scrollable list box displaying multiple options at once. |
| **User Interaction** | Simple single click. | Holds `Ctrl` (Windows) or `Cmd` (Mac) while clicking multiple items. |

### Complete Program Demonstrating Both

```html
<!DOCTYPE html>
<html>
<head>
    <title>Select List</title>
</head>
<body>
    <h2>Student Course Enrollment</h2>

    <form>
        Semester:
        <select>
            <option>Semester 1</option>
            <option>Semester 2</option>
            <option>Semester 3</option>
            <option>Semester 4</option>
        </select>
        <br><br>

        Choose Subjects:
        <select multiple>
            <option>Web Technology</option>
            <option>Artificial Intelligence</option>
            <option>Cloud Computing</option>
            <option>Cyber Security</option>
        </select>
        <br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <h3>Student Course Enrollment</h3>
  <form onsubmit="return false;">
    Semester:<br>
    <select name="semester">
      <option>Semester 1</option>
      <option selected>Semester 2</option>
      <option>Semester 3</option>
      <option>Semester 4</option>
    </select>
    <br><br>
    Choose Subjects (Multi-Select):<br>
    <select multiple size="4" style="width: 100%; max-width: 240px; margin-top: 4px;">
      <option selected>Web Technology</option>
      <option>Artificial Intelligence</option>
      <option selected>Cloud Computing</option>
      <option>Cyber Security</option>
    </select>
    <br><br>
    <input type="submit" value="Submit">
  </form>
</div>

### Analysis of the Output:
1. **Single-Select Dropdown (`<select name="semester">`)**:
   - Appears as a compact single-line dropdown box.
   - Clicking opens the list; choosing an option closes it, displaying only the selected choice.
   - `selected` pre-selects "Semester 2".
2. **Multi-Choice Select Box (`<select name="electives" multiple size="4">`)**:
   - The **`multiple`** attribute enables picking multiple items.
   - The **`size="4"`** attribute displays 4 rows simultaneously without needing to click to open.
   - The user holds the `Ctrl` key to select both "Web Technology" and "Cloud Computing".


---

## Question 25: Evaluate the importance of the Form Object and its methods in web development, and justify the usefulness of a program that dynamically accesses form elements.

### Answer:

The **Form Object** in JavaScript is used to access and control an HTML form. It helps us **read user input, validate data, submit the form, and reset the form**.

### Important Form Methods:

1. **`submit()`** – Submits the form.
2. **`reset()`** – Clears the form and returns it to its original state.
3. **`checkValidity()`** – Checks whether the entered data is valid.

### Simple Program:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Form Object</title>
</head>
<body>
    <form id="myForm">
        Name:
        <input type="text" id="name">
        <br><br>

        <input type="button" value="Show Name" onclick="showName()">
        <input type="reset" value="Reset">
    </form>

    <p id="result"></p>

    <script>
        function showName() {
            let form = document.getElementById("myForm");
            let name = form.elements["name"].value;
            document.getElementById("result").innerHTML = "Name: " + name;
        }
    </script>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <form id="demo-q25-form" onsubmit="return false;">
    Name:<br>
    <input type="text" id="demo-q25-name" value="Rahul Sharma" style="margin-top: 4px; width: 100%; max-width: 220px;">
    <br><br>
    <input type="button" value="Show Name" style="background: #4f46e5; color: #fff; padding: 4px 10px; border-radius: 4px; border: 1px solid #6366f1; cursor: pointer; font-weight: 600;" onclick="var n=document.getElementById('demo-q25-name').value; document.getElementById('demo-q25-res').innerText = 'Name: ' + (n || '(empty)');">
    <input type="reset" value="Reset" style="padding: 4px 10px; border-radius: 4px; cursor: pointer; margin-left: 6px;" onclick="document.getElementById('demo-q25-res').innerText = '';">
  </form>
  <p id="demo-q25-res" style="margin-top: 10px; font-weight: 600; color: #10b981; font-size: 0.9rem;">Name: Rahul Sharma</p>
</div>

### Explanation:

- `document.getElementById("myForm")` → Accesses the form.
- `form.elements["name"]` → Dynamically accesses the **name field**.
- `.value` → Gets the value entered by the user.
- `reset` → Clears the form.

### Why is dynamic access useful?

Dynamic access is useful because JavaScript can **access and work with form fields without directly writing separate code for every field**.

For example, in a **college registration form**, JavaScript can access the student's name, email, course, and other fields and validate or process them before sending the data to the server.

### Conclusion:

The Form Object makes it easier to **access, validate, modify, submit, and reset form data**. Dynamic access makes web forms more **interactive, efficient, and user-friendly**. ✅

---

## Question 26: Develop a feedback form using text area and select elements where users can enter comments and select their satisfaction level.

### Answer

A feedback form is used to collect comments and opinions from users. The `<textarea>` is used for entering comments, and the `<select>` element is used to select the satisfaction level.

### Simple HTML Program:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Feedback Form</title>
</head>
<body>
    <h2>Feedback Form</h2>

    <form>
        Comments:<br>
        <textarea rows="5" cols="30"></textarea>
        <br><br>

        Satisfaction Level:
        <select>
            <option>Very Satisfied</option>
            <option>Satisfied</option>
            <option>Neutral</option>
            <option>Dissatisfied</option>
        </select>
        <br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <h3>Feedback Form</h3>
  <form onsubmit="return false;">
    Comments:<br>
    <textarea rows="4" cols="26" placeholder="Enter comments here..."></textarea>
    <br><br>
    Satisfaction Level:
    <select>
      <option selected>Very Satisfied</option>
      <option>Satisfied</option>
      <option>Neutral</option>
      <option>Dissatisfied</option>
    </select>
    <br><br>
    <input type="submit" value="Submit">
  </form>
</div>

### Explanation:

- **`<textarea>`** → Used to enter multiple lines of comments.
- **`<select>`** → Creates a dropdown list.
- **`<option>`** → Provides different satisfaction levels.
- **Submit** → Submits the feedback.

---

## Question 27: Determine the importance of the various form elements available in web pages and their role in effectively capturing and managing user input, with suitable examples.

### Answer

HTML forms are used to collect information from users and send that information to a server for processing. Different form elements are used depending on the type of data that needs to be collected.

---

### 1. Text Box

A text box is used to accept single-line text from the user.

**Example:**
```html
<input type="text" name="username">
```

**Output:**

<div class="preview-output">
  <input type="text" name="username" placeholder="Enter username">
</div>

- **Use**: Used for entering names, addresses, usernames, etc.

---

### 2. Password Field

A password field is used to enter confidential information. The entered characters are hidden or masked.

**Example:**
```html
<input type="password" name="password">
```

**Output:**

<div class="preview-output">
  <input type="password" name="password" value="secretPass123">
</div>

- **Use**: Used for passwords and other sensitive information.

---

### 3. Radio Button

Radio buttons allow the user to select only one option from a group.

**Example:**
```html
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female
```

**Output:**

<div class="preview-output">
  <label style="margin-right: 12px; cursor: pointer;"><input type="radio" name="demo-gender" value="male" checked> Male</label>
  <label style="cursor: pointer;"><input type="radio" name="demo-gender" value="female"> Female</label>
</div>

- **Use**: Useful when only one choice is allowed.

---

### 4. Checkbox

Checkboxes allow the user to select one or more options.

**Example:**
```html
<input type="checkbox" name="skill" value="python"> Python
<input type="checkbox" name="skill" value="java"> Java
```

- **Use**: Useful for selecting multiple skills, hobbies, interests, etc.

---

### 5. Textarea

A textarea is used to enter multiple lines of text.

**Example:**
```html
<textarea name="address"></textarea>
```

- **Use**: Used for addresses, comments, feedback, messages, etc.

---

### 6. Select / Dropdown List

A dropdown list allows the user to select an option from a predefined list.

**Example:**
```html
<select name="city">
    <option>Chandigarh</option>
    <option>Delhi</option>
    <option>Mumbai</option>
</select>
```

- **Use**: It reduces typing errors because the user selects from available choices.

---

### 7. Submit Button

The submit button is used to send the form data to the server for processing.

**Example:**
```html
<input type="submit" value="Submit">
```

- **Use**: It completes the form submission process.

---

### 8. Reset Button

The reset button is used to clear the entered data and restore the form to its initial state.

**Example:**
```html
<input type="reset" value="Reset">
```

- **Use**: Helpful when the user wants to start filling the form again.

---

### Simple HTML Form Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Simple Form Example</title>
</head>
<body>
    <h2>User Registration Form</h2>

    <form>
        <!-- Text Box -->
        Name: <input type="text" name="username"><br><br>

        <!-- Password Field -->
        Password: <input type="password" name="password"><br><br>

        <!-- Radio Buttons -->
        Gender:
        <input type="radio" name="gender" value="male"> Male
        <input type="radio" name="gender" value="female"> Female<br><br>

        <!-- Checkboxes -->
        Skills:
        <input type="checkbox" name="skill" value="html"> HTML
        <input type="checkbox" name="skill" value="css"> CSS<br><br>

        <!-- Select / Dropdown List -->
        City:
        <select name="city">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Chandigarh</option>
        </select><br><br>

        <!-- Textarea -->
        Address:<br>
        <textarea name="address" rows="3" cols="25"></textarea><br><br>

        <!-- Submit and Reset Buttons -->
        <input type="submit" value="Submit">
        <input type="reset" value="Reset">
    </form>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <h3>User Registration Form</h3>
  <form onsubmit="return false;">
    Name: <input type="text" name="username" placeholder="Enter name"><br><br>
    Password: <input type="password" name="password" value="••••••••"><br><br>
    Gender:
    <input type="radio" name="gender" value="male" id="g-male-q27" checked> <label for="g-male-q27">Male</label>
    <input type="radio" name="gender" value="female" id="g-female-q27"> <label for="g-female-q27">Female</label><br><br>
    Skills:
    <input type="checkbox" name="skill" value="html" id="s-html-q27" checked> <label for="s-html-q27">HTML</label>
    <input type="checkbox" name="skill" value="css" id="s-css-q27"> <label for="s-css-q27">CSS</label><br><br>
    City:
    <select name="city">
      <option selected>Delhi</option>
      <option>Mumbai</option>
      <option>Chandigarh</option>
    </select><br><br>
    Address:<br>
    <textarea name="address" rows="3" cols="24" placeholder="Enter address..."></textarea><br><br>
    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
  </form>
</div>


---

# Web Technology — Previous Questions Quick Revision

This revision sheet is organized question-by-question to help you rapidly revise all 27 exam questions in the final minutes before your MCA examination.

---

## Internet Basics & HTML

### Question 1: What is an IP address?
- **Identity & Routing**: An IP (Internet Protocol) address is a unique numerical address assigned to every device on a network for identification and location routing.
- **Analogy**: Works like a postal home address for digital network packets.
- **IPv4**: 32 bits long, written as 4 dotted-decimal octets ranging from 0 to 255 (e.g., `192.168.1.1`).
- **IPv6**: 128 bits long, written in hexadecimal blocks to solve global address exhaustion.

---

### Question 2: Apply your understanding of IP addressing to explain how unique IPs are assigned to systems and how they enable Internet communication.
- **Dynamic Assignment (DHCP)**: Automatically leases an IP to devices using the 4-step **DORA** sequence (**D**iscover, **O**ffer, **R**equest, **A**cknowledge).
- **Static Assignment**: Manually entered by a network administrator for permanent hosts like web servers and database servers.
- **NAT (Network Address Translation)**: Translates private local addresses (`192.168.x.x`) into one shared public IP provided by the ISP.
- **Communication Flow**: Packets carry both a **Source IP** (sender) and **Destination IP** (target). Intermediate routers read the Destination IP to route packets hop-by-hop across networks.

---

### Question 3: Explain Internet server identities.
- **Domain Name (Human Identity)**: An easy-to-remember alphanumeric name (e.g., `www.example.com`). The Domain Name System (DNS) maps this name to an IP.
- **IP Address (Machine Identity)**: The numerical network address (e.g., `93.184.216.34`) that routers use to locate the physical machine.
- **Port Number (Service Identity)**: A 16-bit number directing traffic to a specific software program running on the server (Port 80 for HTTP, Port 443 for HTTPS, Port 21 for FTP).

---

### Question 4: Explain the structure of the Internet and the various methods through which communication takes place over it, with suitable examples.
- **Internet Structure**: A 3-tier hierarchy: Tier 1 global trans-oceanic backbones, Tier 2 national ISPs, and Tier 3 local broadband/mobile access providers.
- **Client-Server Model**: End users (Clients) send requests to high-performance hosts (Servers).
- **Role of IP (Layer 3)**: Connectionless addressing and routing of packets from source to destination.
- **Role of TCP (Layer 4)**: Reliable, connection-oriented delivery using a **3-way handshake** (`SYN`, `SYN-ACK`, `ACK`), packet sequencing, and automatic retransmission of lost packets.

---

### Question 5: Interpret the practical use of HTML lists, images, and tables in website development.
- **Unordered Lists (`<ul>`)**: Used for bulleted items where sequence does not matter, especially website navigation menus and feature lists.
- **Ordered Lists (`<ol>`)**: Used for numbered sequences, tutorials, recipe steps, and ranked leaderboards (supports `type` and `start`).
- **Definition Lists (`<dl>`)**: Used for term-description pairs (`<dt>`, `<dd>`) such as glossaries and FAQs.
- **Images (`<img>`)**: Void tag using `src` (path), `alt` (screen-reader accessibility and broken-image fallback), `width`, and `height`.
- **Tables (`<table>`)**: Organizes relational data into rows (`<tr>`) and cells (`<th>`, `<td>`) for marksheets and timetables.

---

### Question 6: Explore the various attributes of a table in HTML by providing a suitable example in detail.
- **Structure**: Defined with `<table>`, containing rows `<tr>`, header cells `<th>`, data cells `<td>`, and a title `<caption>`.
- **`border` & `width`**: Set outline line thickness and table width in pixels or percentage.
- **`cellpadding` vs `cellspacing`**: **Cellpadding** = cushion space inside the cell; **Cellspacing** = gap separating neighboring cells.
- **`colspan="N"`**: Merges $N$ columns horizontally.
- **`rowspan="N"`**: Merges $N$ rows vertically.

---

## PART B — LINKING, FRAMES, CSS AND JAVASCRIPT

### Question 7: Define a hyperlink in HTML with syntax.
- **Definition**: A clickable navigational element connecting web pages, files, or sections.
- **Tag**: Created using the anchor tag `<a>`.
- **Attribute**: Uses `href` (Hypertext Reference) to specify the destination URL.
- **Syntax**: `<a href="destination_url">Clickable Text</a>`.

---

### Question 8: Compare internal linking and external linking techniques in terms of usability, performance, and user experience with example.
- **Destination**: Internal links point to pages or sections within the same website (`href="#id"` or `href="page.html"`); external links point to third-party domains (`href="https://site.org"`).
- **Performance**: Internal links load rapidly from cache; external links require fresh DNS lookups and TLS handshakes.
- **User Experience**: Internal links keep user attention inside the portal; external links should open in a new tab (`target="_blank"`).

---

### Question 9: Write the tag used to define the internal link with syntax.
- **Tag**: Anchor tag `<a>`.
- **Syntax**: `<a href="#target_id">Jump to Section</a>`.
- **Destination Element**: Must have the matching ID attribute: `<h2 id="target_id">Section Title</h2>`.

---

### Question 10: Describe the use of Images As Hyperlinks in HTML.
- **Working**: An image is made clickable by nesting an `<img>` tag inside an `<a>` tag.
- **Syntax**: `<a href="page.html"><img src="logo.png" alt="Home" border="0"></a>`.
- **Use Cases**: Header logos returning to the home page, clickable e-commerce product thumbnails, and social media icon buttons.

---

### Question 11: Evaluate the effectiveness of frames in webpage design. Justify whether frames should be used in modern web development with proper reasoning.
- **Working**: Classic HTML 4.01 `<frameset>` and `<frame>` split a browser window into independent sub-windows without a `<body>` tag.
- **Why They Failed**: Broke browser bookmarking (URL never changed), broke the "Back" button, ruined SEO, and failed completely on responsive mobile devices.
- **Modern Justification**: Frames are **deprecated and obsolete in HTML5**; modern sites use **CSS Grid/Flexbox** for layout and **`<iframe>`** for isolated embeds.

---

### Question 12: Make use of Cascading Style Sheets (CSS) to design an HTML page containing headings, paragraphs, and lists with different styles.
- **Concept**: CSS rules follow `selector { property: value; }`.
- **Headings (`h1`, `h2`)**: Styled with `color`, `text-align`, `font-size`, and `border-bottom`.
- **Paragraphs (`p`)**: Formatted with `line-height`, `font-size`, `padding`, and `border-left`.
- **Lists (`ul`, `ol`)**: Styled using `list-style-type` (e.g., `square`, `decimal-leading-zero`) and padding.

---

### Question 13: Which type of Cascading Style Sheet is used within a web page?
- **Answer**: **Internal CSS (Embedded CSS)**.
- **Description**: Written within the HTML page itself, inside the `<style>` tag, usually in the `<head>` section.

---

### Question 14: Make use of Embedded Style Sheet with appropriate description, syntax and program in HTML.
- **Syntax**: Declared inside `<head>` via `<style> selector { property: value; } </style>`.
- **Program Component**: Uses selectors (like `h1`, `p`, `body`) to set colors, font sizes, and background color.
- **Advantages**: Easy for a single web page, no separate CSS file required, styles multiple elements at once.

---

### Question 15: How does JavaScript support event-driven programming?
Event-driven programming is an approach where programs respond to user or browser events (clicks, keypresses). JavaScript listens using `addEventListener()` and triggers a handler function to execute code when the event occurs (e.g. clicking "Add to Cart").

---

### Question 17: Explain the role of the Math object in JavaScript with any one method example.
The Math object in JavaScript is a built-in object used to perform mathematical calculations.
It provides many ready-made methods such as `sqrt()`, `round()`, `ceil()`, `floor()`, and `random()`.

**Example using `sqrt()`:**
```javascript
let num = 25;
let result = Math.sqrt(num);

console.log(result);
```

**Output:**
```text
5
```

**Explanation:**
- `Math` → JavaScript's built-in Math object.
- `sqrt()` → Finds the square root of a number.
- `Math.sqrt(25)` → Returns 5.

---

### Question 18: Explain the properties and methods of the Math Object in JavaScript that are used in solving real-world computational problems.
- **Properties**: `Math.PI` ($\approx 3.14159$) and `Math.E` ($\approx 2.71828$).
- **Rounding**: `Math.round()` (nearest), `Math.floor()` (rounds down), `Math.ceil()` (rounds up).
- **Powers & Roots**: `Math.pow(base, exp)` and `Math.sqrt(x)`.
- **Extremes & Random**: `Math.min()`, `Math.max()`, and `Math.random()` (used to generate random numbers and 4-digit OTPs).

---

### Question 19: Describe Core Language objects with example.

Core Language Objects in JavaScript are built-in objects that provide useful properties and methods for performing common tasks:

| Core Object | Purpose | Example Code | Output |
| :--- | :--- | :--- | :--- |
| **String** | Work with text | `let name = "IRONMAN";`<br>`console.log(name.length);` | `7` |
| **Number** | Work with numbers | `let num = 25;`<br>`console.log(num);` | `25` |
| **Array** | Store multiple values in one variable | `let fruits = ["Apple", "Mango", "Banana"];`<br>`console.log(fruits[0]);` | `Apple` |
| **Date** | Work with date and time | `let today = new Date();`<br>`console.log(today);` | *(Current Date & Time)* |
| **Math** | Mathematical calculations | `let x = Math.sqrt(25);`<br>`console.log(x);` | `5` |

---

### Question 20: Explain the role of Arrays in JavaScript and justify their importance in handling multiple data elements efficiently in web applications.
An **Array** is a collection used to store multiple values in a single variable (`let fruits = ["Apple", "Mango", "Banana"];`).
- **Access**: Elements are zero-indexed (`fruits[0]` gives `"Apple"`).
- **Importance in Web Apps**: Stores and organizes multiple data items, enables easy iteration with loops, and allows dynamic item addition/removal using methods like `push()` and `pop()` (e.g., e-commerce shopping carts).

---

### Question 21: Write the HTML syntax used to create a Submit button in a form.
A Submit button is used in an HTML form to send the entered form data to the server for processing.

#### 2. Syntax
```html
<input type="submit" value="Submit">
```

#### 3. Simple Program
```html
<!DOCTYPE html>
<html>

<body>

    <form>

        Name:
        <input type="text">

        <br><br>

        <input type="submit" value="Submit">

    </form>

</body>

</html>
```

**Output:**
<div class="rendered-form-container">
    <form onsubmit="event.preventDefault(); alert('Form submitted!');">
        Name:
        <input type="text">
        <br><br>
        <input type="submit" value="Submit">
    </form>
</div>

---

### Question 22: What are radio buttons in HTML forms?
Radio buttons are form elements in HTML that allow the user to select only one option from a group of options.
They are created using the `<input type="radio">` tag.

**Syntax:**
```html
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female
```

**Example:**
```html
<form>
    Gender:

    <input type="radio" name="gender"> Male
    <input type="radio" name="gender"> Female
</form>
```

Here, the same `name="gender"` makes the options part of the same group, so the user can select only one.

**Uses:**
- Selecting gender
- Selecting payment method
- Selecting yes/no
- Selecting one answer in a quiz

---

### Question 23: Compare text field and password field in forms.
Both text field and password field are used to take input from the user, but they are used for different purposes.

| Text Field | Password Field |
| :--- | :--- |
| Used to enter normal text. | Used to enter passwords or sensitive information. |
| Characters are visible to the user. | Characters are hidden/masked. |
| Created using `<input type="text">`. | Created using `<input type="password">`. |
| Used for name, username, city, etc. | Used for passwords, PINs, etc. |

**Example:**

- **Text Field:**
  ```html
  <input type="text" name="username">
  ```

- **Password Field:**
  ```html
  <input type="password" name="password">
  ```

---

### Question 24: Distinguish between single select and multi-choice select list elements and also create a program to demonstrate both and analyze the output.
- **Single Select**: Standard `<select name="course">` with `<option>` child tags; allows selecting only 1 item from a compact dropdown.
- **Multi-Choice Select**: Adds the boolean attribute **`multiple`** (`<select name="skills" multiple size="4">`); allows selecting multiple items by holding `Ctrl`/`Cmd`.
- **Output Difference**: Single select displays as a closed 1-line box; multi-select displays as an open scrollable box.

---

### Question 25: Evaluate the importance of the Form Object and its methods in web development, and justify the usefulness of a program that dynamically accesses form elements.
- **Form Object**: Used to access and control an HTML form to read input, validate data, submit, and reset.
- **Key Methods**: `submit()`, `reset()`, and `checkValidity()`.
- **Dynamic Access**: Accessed via `form.elements["name"].value`.
- **Why Dynamic Access is Useful**: Allows working with all form fields dynamically without writing separate code for every input, enabling instant client-side validation before sending data to the server.

---

### Question 26: Develop a feedback form using text area and select elements where users can enter comments and select their satisfaction level.
A feedback form is used to collect comments and opinions from users. The `<textarea>` is used for entering comments, and the `<select>` element is used to select the satisfaction level.

#### Simple HTML Program:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Feedback Form</title>
</head>
<body>
    <h2>Feedback Form</h2>

    <form>
        Comments:<br>
        <textarea rows="5" cols="30"></textarea>
        <br><br>

        Satisfaction Level:
        <select>
            <option>Very Satisfied</option>
            <option>Satisfied</option>
            <option>Neutral</option>
            <option>Dissatisfied</option>
        </select>
        <br><br>

        <input type="submit" value="Submit">
    </form>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <h3>Feedback Form</h3>
  <form onsubmit="return false;">
    Comments:<br>
    <textarea rows="4" cols="26" placeholder="Enter comments here..."></textarea>
    <br><br>
    Satisfaction Level:
    <select>
      <option selected>Very Satisfied</option>
      <option>Satisfied</option>
      <option>Neutral</option>
      <option>Dissatisfied</option>
    </select>
    <br><br>
    <input type="submit" value="Submit">
  </form>
</div>

#### Explanation:
- `<textarea>` → Used to enter multiple lines of comments.
- `<select>` → Creates a dropdown list.
- `<option>` → Provides different satisfaction levels.
- `Submit` → Submits the feedback.

---

### Question 27: Determine the importance of the various form elements available in web pages and their role in effectively capturing and managing user input, with suitable examples.
HTML forms are used to collect information from users and send that information to a server for processing. Different form elements are used depending on the type of data that needs to be collected.

#### 1. Text Box
A text box is used to accept single-line text from the user.  
**Example:**
```html
<input type="text" name="username">
```
- **Use**: Used for entering names, addresses, usernames, etc.

#### 2. Password Field
A password field is used to enter confidential information. The entered characters are hidden or masked.  
**Example:**
```html
<input type="password" name="password">
```
- **Use**: Used for passwords and other sensitive information.

#### 3. Radio Button
Radio buttons allow the user to select only one option from a group.  
**Example:**
```html
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female
```
- **Use**: Useful when only one choice is allowed.

#### 4. Checkbox
Checkboxes allow the user to select one or more options.  
**Example:**
```html
<input type="checkbox" name="skill" value="python"> Python
<input type="checkbox" name="skill" value="java"> Java
```
- **Use**: Useful for selecting multiple skills, hobbies, interests, etc.

#### 5. Textarea
A textarea is used to enter multiple lines of text.  
**Example:**
```html
<textarea name="address"></textarea>
```
- **Use**: Used for addresses, comments, feedback, messages, etc.

#### 6. Select / Dropdown List
A dropdown list allows the user to select an option from a predefined list.  
**Example:**
```html
<select name="city">
    <option>Chandigarh</option>
    <option>Delhi</option>
    <option>Mumbai</option>
</select>
```
- **Use**: It reduces typing errors because the user selects from available choices.

#### 7. Submit Button
The submit button is used to send the form data to the server for processing.  
**Example:**
```html
<input type="submit" value="Submit">
```
- **Use**: It completes the form submission process.

#### 8. Reset Button
The reset button is used to clear the entered data and restore the form to its initial state.  
**Example:**
```html
<input type="reset" value="Reset">
```
- **Use**: Helpful when the user wants to start filling the form again.

#### Simple HTML Form Example:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Simple Form Example</title>
</head>
<body>
    <h2>User Registration Form</h2>

    <form>
        <!-- Text Box -->
        Name: <input type="text" name="username"><br><br>

        <!-- Password Field -->
        Password: <input type="password" name="password"><br><br>

        <!-- Radio Buttons -->
        Gender:
        <input type="radio" name="gender" value="male"> Male
        <input type="radio" name="gender" value="female"> Female<br><br>

        <!-- Checkboxes -->
        Skills:
        <input type="checkbox" name="skill" value="html"> HTML
        <input type="checkbox" name="skill" value="css"> CSS<br><br>

        <!-- Select / Dropdown List -->
        City:
        <select name="city">
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Chandigarh</option>
        </select><br><br>

        <!-- Textarea -->
        Address:<br>
        <textarea name="address" rows="3" cols="25"></textarea><br><br>

        <!-- Submit and Reset Buttons -->
        <input type="submit" value="Submit">
        <input type="reset" value="Reset">
    </form>
</body>
</html>
```

**Output:**

<div class="rendered-form-container">
  <h3>User Registration Form</h3>
  <form onsubmit="return false;">
    Name: <input type="text" name="username" placeholder="Enter name"><br><br>
    Password: <input type="password" name="password" value="••••••••"><br><br>
    Gender:
    <input type="radio" name="gender" value="male" id="g-male-qr" checked> <label for="g-male-qr">Male</label>
    <input type="radio" name="gender" value="female" id="g-female-qr"> <label for="g-female-qr">Female</label><br><br>
    Skills:
    <input type="checkbox" name="skill" value="html" id="s-html-qr" checked> <label for="s-html-qr">HTML</label>
    <input type="checkbox" name="skill" value="css" id="s-css-qr"> <label for="s-css-qr">CSS</label><br><br>
    City:
    <select name="city">
      <option selected>Delhi</option>
      <option>Mumbai</option>
      <option>Chandigarh</option>
    </select><br><br>
    Address:<br>
    <textarea name="address" rows="3" cols="24" placeholder="Enter address..."></textarea><br><br>
    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
  </form>
</div>

