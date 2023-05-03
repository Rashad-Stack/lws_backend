const emailText = ({title,description,linkTitle,linkUrl}) => {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>${title}</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </head>
      <body>
        <div class="card w-96 bg-base-100 shadow-xl p-5     <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #9BCAE0;">
        <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center;">
          <h2 style="color: #3f51b5; font-size: 24px; font-weight: bold; margin-top: 0;">${title}</h2>
          <p style="color: #333; font-size: 16px;">${description}</p>
          <a href=${linkUrl} style="background-color: #3f51b5; border: none; color: #fff; border-radius: 5px; padding: 10px 20px; font-size: 16px; text-decoration: none; display: inline-block;">${linkTitle}</a>
        </div>
      </div>
      </body>
    </html>    
    `
}

module.exports = emailText