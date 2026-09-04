# Scholarship Tracker

A comprehensive web application to help you track your scholarship applications, deadlines, and opportunities.

## 🎯 Features

- **Track Applications**: Add and manage all your scholarship applications in one place
- **Deadline Management**: Get alerts for upcoming deadlines and track days remaining
- **Application Status**: Monitor the status of each application (Draft, In Progress, Submitted, Accepted, Rejected)
- **Statistics Dashboard**: View comprehensive statistics about your scholarship pursuits
- **Search & Filter**: Easily find scholarships by name, organization, or status
- **Requirements Tracking**: Keep track of specific requirements for each scholarship
- **Essay Management**: Note essays and prompts for each scholarship
- **Local Storage**: All data is saved locally in your browser

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PACO-BSC/scholarship-tracker.git
cd scholarship-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 📱 How to Use

1. **Add a Scholarship**: Click the "Add Scholarship" button in the header
2. **Fill in Details**: Enter the scholarship name, organization, amount, deadline, and other details
3. **Track Progress**: Update the status as you progress through the application
4. **Monitor Deadlines**: View how many days you have left for each scholarship
5. **Search & Filter**: Use the search bar and filters to find specific scholarships
6. **View Statistics**: Check the dashboard for a summary of your applications

## 💾 Data Storage

All your scholarship data is stored locally in your browser's localStorage. Your data persists even after closing the browser.

**Important**: Clear your browser cache or data will delete your saved scholarships.

## 🏗 Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Lucide React**: Icons
- **date-fns**: Date utilities
- **CSS3**: Styling

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── ScholarshipCard.tsx
│   ├── ScholarshipModal.tsx
│   └── StatisticsPanel.tsx
├── context/            # React context for state management
│   └── ScholarshipContext.tsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── App.tsx             # Main app component
├── index.css           # Global styles
└── main.tsx            # Entry point
```

## 🎨 Customization

You can customize the app by:
- Modifying CSS files to change colors and styling
- Adding new fields to the Scholarship type
- Extending the ScholarshipContext for additional features
- Adding new components for additional functionality

## 🐛 Troubleshooting

- **Data not persisting**: Check your browser's localStorage settings
- **Styling issues**: Clear browser cache and rebuild with `npm run build`
- **Performance issues**: Check browser console for errors

## 📝 License

MIT License - feel free to use this project for your own scholarship tracking!

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 💡 Future Features

- [ ] Cloud backup and sync
- [ ] Email reminders for deadlines
- [ ] Export data to CSV/PDF
- [ ] Scholarship search integration
- [ ] Collaborative tracking for families
- [ ] Mobile app version

---

Good luck with your scholarship applications! 🍀
