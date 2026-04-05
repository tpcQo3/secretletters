# create_files.py

TOTAL = 15

for i in range(1, TOTAL + 1):
    css_name = f"slide{i}.css"
    js_name = f"slide{i}.js"

    # CSS
    with open(css_name, "w", encoding="utf-8") as css:
        css.write(f"""/* Slide {i} */
.slide{i} {{
    /* custom style */
}}
""")

    # JS
    with open(js_name, "w", encoding="utf-8") as js:
        js.write(f"""// Slide {i}

function slide{i}In() {{
    console.log("Slide {i} In");
}}

function slide{i}Out() {{
    console.log("Slide {i} Out");
}}
""")

print("Done! Created 15 CSS + JS files.")