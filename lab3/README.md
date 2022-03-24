01UDFOV/01TXYOV Applicazioni Web I / Web Applications I [2021/2022] 

Lab 3: Getting started with HTML and CSS 

In this lab, you will start implementing the graphical user interface (GUI) of the web-based version of the Film Library. To that end, you will work with HTML, CSS, and the Bootstrap framework. 

As you have implemented in the first and second lab, the Film Library comprises a collection of films, each with a set of fields (id, title, favorite, watch date, and rating). 

**Note**: Consider that you are NOT requested to implement any functionality in this lab, just to implement the web-based GUI according to the specifications. Indeed, since we are not using any database in this lab, (statically) populate the webpage with a few dummy films (4-5). A possible result is shown at the end of the first exercise (Figure 1). 

1. Implement a web-based GUI of the Film Library 

Develop a static webpage with the user interface to display the list of Films in the Film Library. Use the Bootstrap framework to structure and format the graphical components as described below: 

- On the top of the webpage, there is a **navigation bar**, including a Film Library **logo**, a **search box**, and an icon representing a logged-in user. 
- Below the **navigation bar**, the webpage is structured in two columns: the first one corresponds to a **left sidebar** that occupies one-third of the total width, and the second one corresponds to the **main content**, which occupies the remaining two-thirds. 
- The **left sidebar** is composed of buttons designed to apply the filters over the Films in the Film Library. Such planned filters are: "All," "Favorite," "Best rated," "Seen last month," and "Unseen." Remember that in this lab, you are not required to implement the filtering feature; you just must display the name of the filters.  
- The **main content** has: (**i**) a label to show the title of the current filter; (**ii**) the **films' list** that would result from applying that filter, and (**iii**) an element to create a new film and add it to the Film Library. 
- Each movie in the **films' list** should be displayed in the following manner. 
- The title of the Film. The title of the favorite films should be displayed in red. 
- An element to show and set whether the Film is a favorite (R) or not (o). 
- The Film's watch date in the format "Month D, Yr" (e.g., "March 24, 2022"), if any. 
- The rating of the Film is expressed among one and five stars. If the score is not assigned, five empty stars are visualized. 
- Finally, there is an element for creating a new entry below the films' list. It should be represented by the "+" symbol and positioned in the bottom right corner of the page. 

Use the following screenshot as a reference: 

![](Aspose.Words.7e949535-e6df-4c74-aa48-a44847a5ac8c.001.jpeg)![](Aspose.Words.7e949535-e6df-4c74-aa48-a44847a5ac8c.001.jpeg)

**FIGURE 1 REFERENCE SCREENSHOT**

2. Optional: Implement the responsive version of the web-based GUI 

As an optional exercise, you can try to exploit the responsive features offered by the Bootstrap framework so that if the webpage is ever displayed on a smartphone screen, the left sidebar and the search box should collapse (hide), and all the other components should be re-arranged to fit the screen width (e.g., as shown in the second screenshot below in Figure 2).  

![](Aspose.Words.7e949535-e6df-4c74-aa48-a44847a5ac8c.002.png)![](Aspose.Words.7e949535-e6df-4c74-aa48-a44847a5ac8c.002.png)

**FIGURE 2 RESPONSIVE REFERENCE SCREENSHOT**

**Hints: ![](Aspose.Words.7e949535-e6df-4c74-aa48-a44847a5ac8c.003.png)**

1. Use the Bootstrap 5 framework and its components to implement the static webpage: [https://getbootstrap.com ](https://getbootstrap.com/)
1. You can use find the Film Library logo in the Bootstrap Icons site: [https://icons.getbootstrap.com ](https://icons.getbootstrap.com/)
1. Feel free to create a separate CSS file to customize the appearance of your website. 
