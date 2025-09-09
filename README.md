# Employee Exit Management System

A comprehensive web-based employee exit management system inspired by the Keka HR platform. This system allows employees to initiate resignations and provides administrators with tools to manage the entire exit process.

## Features

### 🏠 Dashboard
- Overview of pending resignations, exits in progress, and completed exits
- Real-time statistics and metrics
- Quick access to all system functions

### 👤 Employee Profile
- Complete employee information display
- Resignation status tracking
- Profile management with tabs for different information sections

### 📝 Resignation Process
- **Employee Initiation**: Employees can submit resignation requests through their profile
- **Manager Discussion**: Tracks whether employees discussed with their manager
- **Reason Selection**: Predefined resignation reasons (Health, Retirement, Personal, etc.)
- **Comments**: Additional details and feedback
- **Notice Period**: Automatic calculation based on company policy
- **Early Exit Preference**: Option to request early last working day

### 🔄 Exit Process Management
The system implements a three-phase exit process:

#### 1. Under Review
- Lists all pending resignation and termination requests
- Shows approval status and required reviewers
- Provides action buttons for managers/HR to review requests
- Filtering and search capabilities

#### 2. Exits in Progress
- Employees whose exit requests have been approved
- Visual status indicators for different exit tasks:
  - **Grey**: Task not started
  - **Yellow**: Task in progress
  - **Green**: Task completed
- Management of assets, finances, surveys, and team transitions

#### 3. Exited Employees
- Employees whose last working day has passed
- Options to edit exit dates or rejoin candidates
- Historical data and reporting

### ⚙️ Settings Configuration
- **Resignation Settings**:
  - Enable/disable resignation form
  - Allow early exit preferences
  - Enable resignation withdrawal
  - Configure approval requirements
  - Manage resignation reasons

- **Termination Settings**:
  - Configure termination approval requirements
  - Manage termination reasons
  - Set up approval workflows

- **Notice Period Settings**:
  - Configure notice period calculations
  - Holiday and weekend handling
  - Company policy enforcement

## How to Use

### For Employees

1. **Access Your Profile**
   - Navigate to the "Employee Profile" tab
   - View your current information and status

2. **Submit Resignation**
   - Click "Resign From Job" button
   - Fill out the resignation form:
     - Indicate if you discussed with your manager
     - Select a reason for resignation
     - Add any additional comments
     - Review notice period information
     - Choose early exit preference (optional)
   - Click "Submit Resignation"

3. **Track Status**
   - Your resignation status will appear as a banner on your profile
   - You'll receive notifications about approval status
   - Last working day will be confirmed after approval

### For Administrators/HR

1. **Review Requests**
   - Go to "Exit Process" tab
   - Check "Under Review" phase for pending requests
   - Use filters to find specific requests
   - Click "View Details" or "Complete Review" to process

2. **Manage Exit Process**
   - Move approved requests to "Exits in Progress"
   - Track completion of exit tasks
   - Manage asset returns and final settlements

3. **Configure Settings**
   - Navigate to "Settings" tab
   - Click "Edit" to modify resignation/termination settings
   - Add or remove resignation/termination reasons
   - Configure approval workflows

## Technical Details

### File Structure
```
Employee-Reg/
├── index.html          # Main application file
├── styles.css          # All styling and responsive design
├── script.js           # Application logic and functionality
└── README.md           # This documentation file
```

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and state management
- **Font Awesome**: Icons and visual elements

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Key Features Implementation

### State Management
The system uses a centralized state object to manage:
- Current user information
- Exit requests and their status
- Resignation and termination reasons
- UI state and navigation

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Collapsible sidebar for mobile devices

### User Experience
- Smooth animations and transitions
- Real-time notifications
- Form validation and error handling
- Intuitive navigation and workflow

### Security Considerations
- Client-side validation
- Secure form handling
- Input sanitization
- Session management ready

## Customization

### Adding New Resignation Reasons
1. Go to Settings → Resignation Settings
2. Click "Edit" to enable editing mode
3. Click "+ Add Reason" to add new reasons
4. Save changes

### Modifying Approval Workflows
1. Navigate to Settings
2. Configure "Resignation review required" options
3. Choose between "Acknowledgement" or "Approval" process
4. Set up approver chains

### Styling Customization
- Modify `styles.css` for visual changes
- Update color schemes in CSS variables
- Customize animations and transitions
- Add company branding elements

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] User authentication and role-based access
- [ ] Email notifications and reminders
- [ ] Document management and file uploads
- [ ] Advanced reporting and analytics
- [ ] API integration with existing HR systems
- [ ] Mobile app development
- [ ] Multi-language support

## Support

For technical support or feature requests, please refer to the system documentation or contact the development team.

## License

This project is developed for internal use. Please ensure compliance with your organization's policies and regulations.
