import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlaneDeparture,
  faCar,
  faTaxi,
  faPerson,
  faCalendarAlt,
  faUserAlt,
  faMapMarkerAlt,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function Header() {
  const elOptions = ["adult", "children", "room"];

  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(true);

  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "add" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const openWindow = (window) => {
    if (window === "date") {
      // open date close option
      setOpenDate((prev) => !prev);
      setOpenOptions(false);
    } else if (window === "options") {
      setOpenOptions((prev) => !prev);
      setOpenDate(false);
    }
  };
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} className="headerListItemIcon" />
            <span>stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              className="headerListItemIcon"
            />
            <span>flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} className="headerListItemIcon" />
            <span>car rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPerson} className="headerListItemIcon" />
            <span>attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} className="headerListItemIcon" />
            <span>airport taxis</span>
          </div>
        </div>
        <h1 className="headerTitle">Find your next stay</h1>
        <p className="headerDesc">
          Search deals on hotels, homes, and much more...
        </p>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="headerSearchIcon"
              htmlFor="destination"
            />
            <input
              type="text"
              placeholder="Where are you going ?"
              name="destination"
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="headerSearchIcon"
            />
            <span onClick={() => openWindow("date")}>
              {format(date[0].startDate, "ccc dd LLL")} -
              {format(date[0].endDate, "ccc dd LLL")}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
                className="date"
                // rangeColors={["gray", "green", "yellow"]}
              />
            )}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon
              icon={faUserAlt}
              className="headerSearchIcon"
              htmlFor="options"
            />
            <span name="options" onClick={() => openWindow("options")}>
              1 adults - 0 children - 1 room
            </span>
            {openOptions && (
              <div className="options">
                {elOptions.map((el, i) => (
                  <div className="optionItem" key={`option-${i}`}>
                    <span className="optionTxt">{el}</span>
                    <div className="optionCounter">
                      <button
                        className={`btn optionBtn ${
                          el === "children"
                            ? option[el] === 0
                              ? "optionBtnDisable"
                              : ""
                            : option[el] <= 1
                            ? "optionBtnDisable"
                            : ""
                        }`}
                        onClick={() => handleOption(el, "sub")}
                        disabled={
                          el === "children" ? option[el] === 0 : option[el] <= 1
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="optionTxt">{option[el]}</span>
                      <button
                        className="btn optionBtn"
                        onClick={() => handleOption(el, "add")}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="headerSearchItem">
            <button className="btn headerSearchButton">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
