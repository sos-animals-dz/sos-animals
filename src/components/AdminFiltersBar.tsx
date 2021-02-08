import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface IProps {
  filterAnimals: (sort: { date: string; type: string }) => void;
}

const AdminFiltersBar = (props: IProps) => {
  const [date, setDate] = useState<string>('desc');
  const [type, setType] = useState<string>('all');
  const { filterAnimals } = props;

  const byDateOptions = [
    { value: 'desc', label: 'Oldest first' },
    { value: 'asc', label: 'Newest first' },
  ];

  const byTypeOptions = [
    { value: 'all', label: 'All Animals' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
    { value: 'bird', label: 'Birds' },
    { value: 'other', label: 'Others' },
  ];

  const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      let bgColor = '#fafbfc';
      let textColor = '#212121';

      if (isSelected) {
        bgColor = '#cc0202';
        textColor = '#fafbfc';
      } else if (isFocused) {
        bgColor = '#cc020222';
      }

      return {
        ...styles,
        backgroundColor: bgColor,
        color: textColor,
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  const onSortByDate = (sort: any) => {
    const { value } = sort;
    setDate(value.toLowerCase());
  };

  const onSortByType = (sort: any) => {
    const { value } = sort;
    setType(value.toLowerCase());
  };

  useEffect(() => {
    filterAnimals({ date, type });
  }, [date, type]);

  return (
    <div className="admin-firlers-bar">
      <div className="title">
        <span>Animals List:</span>
      </div>
      <div className="filters">
        <div className="by-date">
          <div className="timetable-icon">
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="m482 292.25v-246.25c0-8.285156-6.714844-15-15-15h-76v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-76c-8.285156 0-15 6.714844-15 15v391c0 8.285156 6.714844 15 15 15h249.804688c24.25 36.152344 65.488281 60 112.195312 60 74.4375 0 135-60.5625 135-135 0-32.070312-11.25-61.5625-30-84.75zm-391-231.25v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h61v60h-422v-60zm-61 361v-271h422v113.804688c-21.464844-14.394532-47.269531-22.804688-75-22.804688-47.398438 0-89.164062 24.558594-113.257812 61.613281-2.027344-1.023437-4.3125-1.613281-6.742188-1.613281h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h22.722656c-3.386718 9.554688-5.730468 19.601562-6.882812 30h-15.839844c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h15.839844c1.152344 10.398438 3.492187 20.445312 6.882812 30zm347 60c-57.898438 0-105-47.101562-105-105s47.101562-105 105-105 105 47.101562 105 105-47.101562 105-105 105zm0 0" />
              <path d="m437 362h-45v-45c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15h60c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0" />
              <path d="m136 182h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0" />
              <path d="m136 242h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0" />
              <path d="m136 302h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0" />
              <path d="m227 212h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0" />
              <path d="m227 272h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0" />
              <path d="m136 362h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0" />
              <path d="m347 212h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0" />
            </svg>
          </div>
          <div className="options">
            <Select
              styles={colorStyles}
              onChange={onSortByDate}
              defaultValue={byDateOptions[0]}
              options={byDateOptions}
            />
          </div>
        </div>
        <div className="by-type">
          <div className="sort-icon">
            <svg
              viewBox="0 0 512.046 512.046"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m211.023 512.046v-129.546l-120-90v-52.5h330v52.5l-120 90v85.896zm-90-234.546 120 90v96.654l30-14.55v-82.104l120-90v-7.5h-270z" />
              <path d="m256.023 210c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.644 75-75 75zm0-120c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.186-45-45-45z" />
              <path d="m136.023 90c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45zm0-60c-8.271 0-15 6.729-15 15s6.729 15 15 15 15-6.729 15-15-6.729-15-15-15z" />
              <path d="m376.023 90c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.186 45-45 45zm0-60c-8.271 0-15 6.729-15 15s6.729 15 15 15 15-6.729 15-15-6.728-15-15-15z" />
            </svg>
          </div>
          <div className="options">
            <Select
              styles={colorStyles}
              onChange={onSortByType}
              defaultValue={byTypeOptions[0]}
              options={byTypeOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFiltersBar;
