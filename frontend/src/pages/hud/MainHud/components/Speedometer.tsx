import React from "react";
import { observer } from "mobx-react-lite";
import { hudStore } from "store/Hud.store";

const Speedometer: React.FC<{ store: typeof hudStore }> = ({ store }) => {
    const radius = 100;

    const ticks = Array.from({ length: 11 }, (_, i) => i * (store.vehicleData.maxSpeed / 10)); // 11 ticks from 0 to maxSpeed

    // Calculate the angle for the line pointing at the current speed
    const angle = ((store.vehicleData.speed / store.vehicleData.maxSpeed) * 260 - 180) * (Math.PI / 180); // Adjust the angle calculation

    const lineX = 120 + (radius - 10) * Math.cos(angle);
    const lineY = 120 + (radius - 10) * Math.sin(angle);
    const minorTickCount = 4;
    const majorTickAngleStep = 260 / (ticks.length - 1);
    const minorTickAngleStep = majorTickAngleStep / (minorTickCount + 1);

    return (
        <svg width="300" height="300" viewBox="0 0 240 240">
            {/* Arc */}
            <circle
                cx="120"
                cy="120"
                r={90}
                fill="rgba(0, 0, 0, 0.5)"
                strokeDasharray={0} // Use fullCircumference for strokeDasharray
                strokeDashoffset={0}
                transform="rotate(180 120 120)"
            />
            {/* Speed arc */}
            <circle
                cx="120"
                cy="120"
                r={radius}
                stroke={"#28272b"}
                strokeWidth="20"
                fill="none"
                strokeDasharray={0} // Use fullCircumference for strokeDasharray
                strokeDashoffset={0}
                transform="rotate(180 120 120)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
            <line x1="120" y1="120" x2={lineX} y2={lineY} stroke="#fff" strokeWidth="2" />

            <circle cx="120" cy="120" r="20" fill="#28272b" stroke="#28272b" />
            <text x="115" y="128" fontFamily="Beast Duh" fontSize="20" fill="white">
                {store.vehicleData.gear}
            </text>
            <rect x="97" y="140" width="50" height="20" fill="#28272b" />
            <text x="98.5" y="155.5" fontFamily="Beast Duh" fontSize="15" fill="white">
                {store.vehicleData.speed.toFixed()} KM/H
            </text>
            {ticks.map((tick, index) => {
                const majorAngle = (index * majorTickAngleStep - 180) * (Math.PI / 180);
                const majorX1 = 120 + radius * Math.cos(majorAngle);
                const majorY1 = 120 + radius * Math.sin(majorAngle);
                const majorX2 = 120 + (radius - 20) * Math.cos(majorAngle);
                const majorY2 = 120 + (radius - 20) * Math.sin(majorAngle);
                const textX = 120 + (radius - 35) * Math.cos(majorAngle);
                const textY = 120 + (radius - 35) * Math.sin(majorAngle);

                return (
                    <g key={tick}>
                        {/* Major tick line */}
                        <line x1={majorX1} y1={majorY1} x2={majorX2} y2={majorY2} stroke={store.vehicleData.speed >= tick ? "red" : "white"} strokeWidth="2" />
                        {/* Major tick text */}
                        <text x={textX} y={textY} textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#fff" dy=".35em">
                            {tick}
                        </text>

                        {/* Minor ticks */}
                        {index < ticks.length - 1 &&
                            Array.from({ length: minorTickCount }).map((_, minorIndex) => {
                                const minorAngle = (index * majorTickAngleStep + (minorIndex + 1) * minorTickAngleStep - 180) * (Math.PI / 180);
                                const minorX1 = 120 + radius * Math.cos(minorAngle);
                                const minorY1 = 120 + radius * Math.sin(minorAngle);
                                const minorX2 = 120 + (radius - 10) * Math.cos(minorAngle);
                                const minorY2 = 120 + (radius - 10) * Math.sin(minorAngle);

                                // Calculate the minor tick value for speed comparison
                                const minorTickValue = tick + ((minorIndex + 1) / (minorTickCount + 1)) * (ticks[index + 1] - tick);

                                return (
                                    <line key={minorIndex} x1={minorX1} y1={minorY1} x2={minorX2} y2={minorY2} stroke={store.vehicleData.speed >= minorTickValue ? "red" : "white"} strokeWidth="1" />
                                );
                            })}
                    </g>
                );
            })}
            {/* <path
                d="M9.00018 0C9.53061 0 10.0393 0.210714 10.4144 0.585786C10.7895 0.960859 11.0002 1.46957 11.0002 2C11.0002 3.11 10.1102 4 9.00018 4C8.46974 4 7.96104 3.78929 7.58596 3.41421C7.21089 3.03914 7.00018 2.53043 7.00018 2C7.00018 1.46957 7.21089 0.960859 7.58596 0.585786C7.96104 0.210714 8.46974 0 9.00018 0ZM9.39018 12.79C10.8107 12.7845 12.2301 12.868 13.6402 13.04C13.7002 10.32 13.4602 7.92 13.0002 7C12.8702 6.73 12.6902 6.5 12.5002 6.3L4.43018 13.22C5.79018 13 7.50018 12.79 9.39018 12.79ZM4.46018 15C4.59018 16.74 4.85018 18.5 5.27018 20H7.34018C7.05018 19.12 6.84018 18.09 6.68018 17C6.68018 17 9.00018 16.56 11.3202 17C11.1602 18.09 10.9502 19.12 10.6602 20H12.7302C13.1702 18.45 13.4302 16.61 13.5602 14.79C12.1764 14.6237 10.7839 14.5402 9.39018 14.54C7.46018 14.54 5.78018 14.75 4.46018 15ZM9.00018 5C9.00018 5 6.00018 5 5.00018 7C4.66018 7.68 4.44018 9.15 4.37018 10.96L10.9202 5.34C9.93018 5 9.00018 5 9.00018 5ZM15.5702 3.67L14.4302 2.34L10.9202 5.35C11.4702 5.54 12.0502 5.84 12.5002 6.3L15.5702 3.67ZM17.6702 13.83C17.5802 13.8 16.1402 13.33 13.6402 13.04C13.6302 13.61 13.6002 14.2 13.5602 14.79C15.8102 15.07 17.1002 15.5 17.1202 15.5L17.6702 13.83ZM4.37018 10.96L0.430176 14.34L1.32018 15.82C1.34018 15.81 2.50018 15.36 4.46018 15C4.35018 13.59 4.32018 12.2 4.37018 10.96Z"
                fill="#fff"
                transform="translate(90, 180)"
            /> */}

            <path
                d="M16 11H13V13H16V11ZM19 18H0V8L8 0H18C18.2652 0 18.5196 0.105357 18.7071 0.292893C18.8946 0.48043 19 0.734784 19 1V18ZM8.83 2L2.83 8H17V2H8.83Z"
                fill={store.vehicleData.locked ? "green" : "#fff"}
                transform="translate(90, 180)"
            />

            <path
                d="M15.6119 0.955929C12.8649 -0.265071 9.56194 1.23393 9.23194 4.42893C9.07636 5.94762 8.99892 7.47329 8.99994 8.99993C8.99994 10.7299 9.09694 12.2689 9.23094 13.5699C9.56094 16.7659 12.8649 18.2649 15.6119 17.0439L15.8369 16.9439C17.3736 16.2609 18.6792 15.1468 19.5955 13.7367C20.5119 12.3266 20.9996 10.6811 20.9996 8.99943C20.9996 7.31778 20.5119 5.67221 19.5955 4.26213C18.6792 2.85206 17.3736 1.73799 15.8369 1.05493L15.6119 0.954929V0.955929ZM7.37194 3.92793C7.61076 3.82437 7.79979 3.63177 7.89886 3.39106C7.99793 3.15034 7.99924 2.88048 7.90249 2.63882C7.80575 2.39715 7.61859 2.20274 7.38077 2.09688C7.14296 1.99103 6.87325 1.98208 6.62894 2.07193L1.62894 4.07193C1.39162 4.17638 1.20416 4.36891 1.10608 4.60893C1.00799 4.84894 1.00697 5.11767 1.10322 5.35842C1.19947 5.59918 1.38547 5.79314 1.62198 5.89939C1.85849 6.00564 2.12703 6.01587 2.37094 5.92793L7.37194 3.92793ZM7.92794 7.62793C7.97673 7.74986 8.00103 7.88021 7.99945 8.01153C7.99786 8.14286 7.97042 8.27258 7.9187 8.3933C7.86698 8.51402 7.79198 8.62336 7.698 8.7151C7.60401 8.80683 7.49288 8.87915 7.37094 8.92793L2.37094 10.9279C2.24855 10.9791 2.11721 11.0054 1.98457 11.0053C1.85193 11.0052 1.72063 10.9787 1.59832 10.9273C1.47601 10.876 1.36514 10.8008 1.27216 10.7062C1.17918 10.6116 1.10595 10.4995 1.05674 10.3763C1.00752 10.2531 0.9833 10.1214 0.985488 9.98877C0.987675 9.85614 1.01623 9.72528 1.06948 9.60379C1.12273 9.48231 1.19962 9.37263 1.29567 9.28115C1.39172 9.18966 1.50501 9.11821 1.62894 9.07093L6.62894 7.07093C6.75093 7.02216 6.88134 6.99791 7.01271 6.99956C7.14408 7.00122 7.27383 7.02874 7.39456 7.08056C7.51529 7.13238 7.62462 7.20748 7.71631 7.30157C7.808 7.39566 7.88025 7.5069 7.92894 7.62893L7.92794 7.62793ZM7.37094 13.9279C7.61314 13.8267 7.80582 13.6343 7.90742 13.3923C8.00901 13.1502 8.01136 12.878 7.91397 12.6342C7.81657 12.3905 7.62723 12.1948 7.38682 12.0894C7.14641 11.984 6.8742 11.9774 6.62894 12.0709L1.62894 14.0709C1.38674 14.1721 1.19405 14.3645 1.09246 14.6066C0.990865 14.8486 0.988513 15.1209 1.08591 15.3646C1.18331 15.6084 1.37265 15.8041 1.61306 15.9095C1.85347 16.0149 2.12568 16.0215 2.37094 15.9279L7.37094 13.9279Z"
                fill={store.vehicleData.lights ? "green" : "#fff"}
                transform="translate(65, 165)"
            />

            <path d="M6 0V2H9V4H6L4 6V9H2V6H0V14H2V11H4V14H7L9 16H17V12H19V15H22V5H19V8H17V4H11V2H14V0H6Z" fill={store.vehicleData.engine ? "green" : "darkred"} transform="translate(50, 140)" />

            {/* BD1111 */}
        </svg>
    );
};

export default observer(Speedometer);
