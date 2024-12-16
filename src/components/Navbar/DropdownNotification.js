import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from './ClickOutside';

const DropdownNotification = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <li>
                <Link
                    onClick={() => {
                        setNotifying(false);
                        setDropdownOpen(!dropdownOpen);
                    }}
                    to="#"
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                >
                    <span
                        className={`absolute -top-0.5 right-0 z-10 h-2 w-2 rounded-full bg-meta-1 ${notifying ? 'block' : 'hidden'
                            }`}
                    >
                        <span className="absolute z-0 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                    </span>

                    {/* Notification Icon */}
                    <svg
                        className="fill-current text-gray-700 dark:text-white"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "currentColor" }}
                    >
                        <path
                            d="M16.2 14.93l-.56-.87a1.38 1.38 0 01-.17-.87V7.68A5.15 5.15 0 009.65 2.17V1.13A.65.65 0 008.35.48.65.65 0 008 .48v.66A5.15 5.15 0 002.47 7.79v5.85c0 .31-.06.64-.17.87l-.56.87a.65.65 0 00.56.98h5.82v.62c0 .37.3.67.65.67s.65-.3.65-.67v-.62h5.82a.65.65 0 00.56-.98z"
                            fill="currentColor"
                        />
                    </svg>

                </Link>

                {dropdownOpen && (
                    <div className="absolute -right-20 mt-2.5 flex flex-col rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark sm:right-0">
                        <div className="px-4 py-3 border-b dark:border-strokedark">
                            <h5 className="text-sm font-medium text-bodydark2 dark:text-white">Notifications</h5>
                        </div>

                        <ul className="flex flex-col overflow-y-auto">
                            {[
                                {
                                    message: 'Edit your information in a swipe',
                                    description:
                                        'Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
                                    date: '12 May, 2025',
                                },
                                {
                                    message: 'It is a long established fact',
                                    description: 'That a reader will be distracted by the readable.',
                                    date: '24 Feb, 2025',
                                },
                                {
                                    message: 'There are many variations',
                                    description:
                                        'Of passages of Lorem Ipsum available, but the majority have suffered.',
                                    date: '04 Jan, 2025',
                                },
                                {
                                    message: 'There are many variations',
                                    description:
                                        'Of passages of Lorem Ipsum available, but the majority have suffered.',
                                    date: '01 Dec, 2024',
                                },
                            ].map((notification, index) => (
                                <li key={index}>
                                    <Link
                                        className="flex flex-col gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-meta-4"
                                        to="#"
                                    >
                                        <p className="text-sm text-black dark:text-white">
                                            <span className="font-medium">{notification.message}</span> -{' '}
                                            {notification.description}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </li>
        </ClickOutside>
    );
};

export default DropdownNotification;
