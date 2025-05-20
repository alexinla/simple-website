# Simple Website

A modern, responsive website built with HTML, CSS, and JavaScript.

## Features

- Responsive design
- Modern UI with smooth animations
- Contact form
- Mobile-friendly navigation

## Hosting on AWS

To host this website on AWS, follow these steps:

1. **Create an AWS Account**
   - Go to [AWS Console](https://aws.amazon.com/console/)
   - Sign up for an AWS account if you don't have one

2. **Set up AWS Amplify**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Choose "GitHub" as your repository source
   - Connect your GitHub account and select this repository
   - Follow the deployment steps

3. **Alternative: Use AWS S3 + CloudFront**
   - Create an S3 bucket
   - Enable static website hosting
   - Upload all files to the bucket
   - Create a CloudFront distribution pointing to the S3 bucket
   - Configure your domain name (optional)

## Local Development

To run this website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. Make changes to the files as needed

## File Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality

## License

MIT License 