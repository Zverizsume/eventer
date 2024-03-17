# Eventer App

Eventer is a web application built using Next.js and Supabase, designed to manage and organize events efficiently. Whether you're planning a conference, a workshop, or a small get-together, Eventer provides the tools you need to create, manage, and share events seamlessly.

## Features

- **Event Creation**: Easily create new events with details such as title, description, date, time, and location.
- **Event Management**: Edit or delete events as needed. Keep track of attendees and manage RSVPs effortlessly.
- **User Authentication**: Secure user authentication powered by Supabase ensures that only authorized users can create or manage events.
- **Real-time Updates**: Enjoy real-time updates on event details and attendee lists, ensuring everyone stays informed.
- **Responsive Design**: The application is designed to work seamlessly across various devices, from desktops to mobile phones.

## Technologies Used

- **Next.js**: Next.js is a React framework for building server-side rendered and statically generated web applications. It offers features like automatic code splitting, hot code reloading, and server-side rendering.
- **Supabase**: Supabase is an open-source Firebase alternative that provides a suite of tools for building scalable applications with features like real-time database, authentication, and more.

## Getting Started

To run Eventer locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Zverizsume/eventer.git
   ```

2. Navigate to the project directory:

   ```
   cd eventer
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a Supabase project and obtain your API URL and public key.

5. Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-api-url
   NEXT_PUBLIC_SUPABASE_KEY=your-supabase-public-key
   ```

6. Run the development server:

   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js**: [https://nextjs.org/](https://nextjs.org/)
- **Supabase**: [https://supabase.io/](https://supabase.io/)

## Contact

For inquiries or support, feel free to contact us at [zeliranje@gmail.com](mailto:zeliranje@gmail.com).
