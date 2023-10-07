export default function (title: string, url: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Update Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
    
            .container {
                max-width: 600px;
                margin: 10px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #333;
                line-height: 1.6;
            }

            .muted {
                color: #666;
            }
    
            a {
                background-color: #007bff;
                color: #fff;
                padding: 10px 15px;
                text-decoration: none;
                border-radius: 4px;
            }
    
            a:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>${title}</h2>
            <p>Hello there!</p>
            <p>We're excited to let you know that the product you've been tracking has been updated. You can view the latest details and changes by clicking the link below:</p>
            <a href="${url}">View Updated Product</a>
            <p class="muted">Thank you for staying with us and happy shopping!</p>
            <p class="muted">Best wishes,<br>The Team PriceWise</p>
        </div>
    </body>
    
    </html>`
}