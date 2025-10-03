import React, { useState, useRef, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';

// Custom Dropdown Component
interface CustomDropdownProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  label: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(prev =>
          prev < options.length - 1 ? prev + 1 : 0
        );
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (isOpen) {
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : options.length - 1
        );
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isOpen && highlightedIndex >= 0) {
        handleSelect(options[highlightedIndex].value);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="group relative">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">
        {label}{required && ' *'}
      </label>
      <div ref={dropdownRef} className="relative">
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />

        {/* Dropdown trigger */}
        <button
          id={id}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3 bg-slate-50 border text-left rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300 cursor-pointer flex items-center justify-between ${
            value ? 'text-slate-800' : 'text-slate-400'
          }`}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl">
            <div className="py-1">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full px-4 py-3 text-left hover:bg-orange-50 hover:text-orange-700 transition-colors duration-150 rounded-lg ${
                    option.value === value
                      ? 'bg-orange-100 text-orange-700'
                      : highlightedIndex === index
                        ? 'bg-slate-100'
                        : 'text-slate-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [educationStatus, setEducationStatus] = useState('');
  const [state, handleSubmit] = useForm("mgvnyldv");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to start your next project? Fill out the form below and let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div
          className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 transform transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter your full name"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>



              {/* Education - Custom Dropdown */}
              <CustomDropdown
                id="education"
                name="education"
                label="Education Status"
                value={educationStatus}
                onChange={setEducationStatus}
                placeholder="Select education status"
                options={[
                  { value: "Student", label: "Student" },
                  { value: "Completed", label: "Completed" }
                ]}
              />
              <ValidationError
                prefix="Education"
                field="education"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />

              {/* Phone */}
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter your phone number"
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="group md:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter your email address"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Conditional Fields */}
            {educationStatus === 'Student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* College Name */}
                <div className="group">
                  <label htmlFor="collegeName" className="block text-sm font-semibold text-slate-700 mb-2">
                    College Name
                  </label>
                  <input
                    type="text"
                    id="collegeName"
                    name="collegeName"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                    placeholder="Enter your college name"
                  />
                  <ValidationError
                    prefix="College Name"
                    field="collegeName"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Branch */}
                <div className="group">
                  <label htmlFor="branch" className="block text-sm font-semibold text-slate-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    id="branch"
                    name="branch"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                    placeholder="Enter your branch"
                  />
                  <ValidationError
                    prefix="Branch"
                    field="branch"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            )}

            {educationStatus === 'Completed' && (
              <div className="group">
                <label htmlFor="organizationName" className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300"
                  placeholder="Enter your organization name"
                />
                <ValidationError
                  prefix="Organization Name"
                  field="organizationName"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}

            {/* Project Details */}
            <div className="group">
              <label htmlFor="projectDetails" className="block text-sm font-semibold text-slate-700 mb-2">
                Project Details *
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-slate-300 resize-none"
                placeholder="Tell us about your project ideas, requirements, timeline, and budget..."
              />
              <ValidationError
                prefix="Project Details"
                field="projectDetails"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center space-y-4">
              <button
                type="submit"
                disabled={state.submitting}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {state.submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {state.succeeded && (
                <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {state.errors && Object.keys(state.errors).length > 0 && (
                <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  There was an error sending your message. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
