const CATEGORY_KOREAN_ICON = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="korean">
<path d="M30 15C30 6.72 23.28 0 15 0C6.72 0 0 6.72 0 15C0 20.535 3.705 25.29 9 27.375V30H21V27.375C26.295 25.29 30 20.535 30 15ZM27 15H21V4.62C24.585 6.705 27 10.575 27 15ZM18 3.39V15H12V3.39C12.96 3.15 13.965 3 15 3C16.035 3 17.04 3.15 18 3.39ZM3 15C3 10.575 5.415 6.705 9 4.62V15H3Z" fill="white"/>
</svg>`;

const CATEGORY_CHINESE_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="chinese">
<mask id="mask0_3339_1476" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="url(#pattern0)"/>
</mask>
<g mask="url(#mask0_3339_1476)">
<rect y="-2" width="39" height="39" fill="white"/>
</g>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3339_1476" transform="scale(0.0104167)"/>
</pattern>
<image id="image0_3339_1476" width="96" height="96" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;

const CATEGORY_JAPANESE_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="japanese">
<mask id="mask0_3339_1484" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="url(#pattern1)"/>
</mask>
<g mask="url(#mask0_3339_1484)">
<rect x="-2" y="-2" width="39" height="39" fill="white"/>
</g>
<defs>
<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3339_1484" transform="scale(0.0104167)"/>
</pattern>
<image id="image0_3339_1484" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdUlEQVR4nO2cW4hWVRTHf1bTzGhqU6M5aVFUhGmXh+qhegga6KHEwoSimArMClIneggjoovSQBTRU9EFujyURBciIiYJMivErKwkiq5alqSVmsNMM7Njw/+DQeY7l+/cz6wfLBj0O2ef8z9n773W2msfMAzDMAzDMAzDMAzDMAzDMAzDMKKwCLgi0i+NVFkAPAWMAruB6eme3mjGccAAMAS4Cdbf9AgjFfwbfjfw12HCN8x6QUa0ASuB35oIb70gI6YBy4FvIwhvvSBleoGtMYS3XpASFwAbWxS+YR+mdTFTiTOBDcB4AuH3aJJuL/pmqsR8+fL/JRB+r4TvLPpmqsRMibY/gfAHFA8cW/TNVImj5VLuSSD8sHrNCdQkuLkIWA08D3wE7FBQMyT7FfgK2AQ8C9wOnC//PCpHASuAnQmEHwGe1LBVafwktQR4ATiYQJBDmjiXSOAgl3J7gnbG1M4ZVJxOjbt7E7p5bhLbpZ4xsVdcCnyS4JzeI3odWEwNuCFh93cR7RvgFuCdhOcZBC6kBnQAT+cgvEvJfI+5jJowF/i0BKK6CPaF5pLa0CmPxpXcfpRbeiQ1yyK+UQJxXYD9orkiyHuqLCtiijGqBNb9wDJgITBH7mq7/l6o/3sA2KxjWhHeB2B3am6qJR0RFy6cfrdWArcyv9wToy2nB3wMNefGiIHNo8CMFNrz53hM5wxrdylTgLcjhPPXZtDudREymq8yBWi2YN2wdSHHzwbWA18qTXFQf/t/mxVy7PqQtn0EnjX+Gm9WbqsQwoYBX0sTxGcBx24LOfakCO1ngXdhLwdeAv6d8LALWZgJE6An5PhtAcf6oK5MD8DniB5RtnaytrzXljtRPJGwLrxO2csDMh+lPhRhCHo4hwcwVwVYQS9Kw3wslDthF+UnyqszaPf6iMuKrbrWvjzlrZhLl97h6CZnolzYmN7ojhTa83794xHdUBczmr9YK19hjkWQ3UHOxLm4n4BV8nziMg+4VytncdoM41TgPuC7BKJPtC3kTCsXOaT8/V1KBXsRuvQWtmvcPQu4BngQ+DjGGx/lAcxW+uSDhGUpzVbtesr+AFyO1uAILVUmXRZtZr6qbg1wfF7Cz1LXdSW3c5UGiTt0RbEflCw8nRyZoSf9RwnEdQXYP+pFvRoycy0nWZPRm+RKbmNKn68sIrvaKGyKkwaui+1QIHlK3qJPFH5XCYRwOdo+xQKXUBC+zqYP+L4EYricbFhR73K9eIUKn1ZAUgX7WoVjPu4onE0lEMTlYDuVxPNrzqWivwTiuIxsKGJNaeF1PXE8nf1KE7gSu47vAzdpb0Al6G+hVt6VzH7WJorTqCAdAW7niIQ/8bBjXAns76Ki0zx6QaNWvtkbVZToo6po7qvbNxsavWBcwvvdhEEU5TrOo8ZcCZwd8bd5iL5bGc1zYtzDeVo5qzVtGbuOL+u7PFFdxzlKGE4sdantB4sGMkpJb5WI3TFqdHo1XA5Pcr7asEDCfJ5RdDoQc1Nc4yX4PeTclWaWvIzBjNZON8R0HbuUoY3zUY3K0iOR0nYd31VNz/QY88xSFT2NxGzPl5dUmi0pu47zW/Bikuxwf42KsyrnhY2uFoaYoN7mF+QrTXfMbj+sjc5XxVjYaEswxATZE9SENzNa2FgU0Ytpxd6r0zd8loW4jr6CjQSBkkvZNqe0Fao0+KHkzwQLG2GBkkvRXqzrR5RWaxvOzJy9GBfR/J6C2zK8/0rSq40WWQo/rp51ctE3W1b88HNrzO9wugjmh7JX6vJ1kzyYpnjgOdVWJqlUW1uXT4cV2SsWqz7/GS2cb9ci0CFtCdqnXjMof76vqPJAwzAMwzAMwzAMwzAMwzAMwzAMYvI/nThSBfxGl+QAAAAASUVORK5CYII="/>
</defs>
</svg>
`;

const CATEGORY_WESTERN_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="western">
<mask id="mask0_3339_1480" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="url(#pattern2)"/>
</mask>
<g mask="url(#mask0_3339_1480)">
<rect x="-2" y="-1" width="39" height="39" fill="white"/>
</g>
<defs>
<pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3339_1480" transform="scale(0.0104167)"/>
</pattern>
<image id="image0_3339_1480" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFiklEQVR4nO2dW6hVRRjHf5blya6cLlSW+lChXUgOBRHdrSzMkqS0OCVFhNBDEdVDEPgYFFERRRhENyqIkkqsjKighwSNSqmQbpAWR62sB9vHrRMD34LNYe+1ZtZee803a88PPjgPe8+e9f+vmTXzzaw5kEgkEolEIpFIJBLNZRrwqESiZqYDLwBGIplQI4cD6zrETybUyCjwRRfxkwk1MAf4Lkf8ZMIAORv4zUH8LMYHWZlh4wJgl4f4HwIjoSvdJN7xEH99Et+Pk4CFwBk5nxkRYZP4FTIDWAPs7xB2M3BWSRPSne/Jcz2E3A2MeZrgI/4xvhVtIicA+3LuZh8TfMRfDfwEnMqQc6lDf+5igq/4WdnbgJMZYs50HNEUmVBG/Cy+B05kiNlUgQllxc9iC3A8Q8p8EXeQJuSJn8XXwLEMKWMDNMFF/CweoaGMyIinbhN8xH8ZOIiGcTrwHtCSi7QZzMU1mXAasNexrNeAg2lgyniiy8XaGe+dNZlwjYMJb8qqWuNYk3PRWkx4q6niI+Nro9iEtcAhNJitDsIdAFbllLHAI///F3B+TllXd5iwXpKAOD7Io1zof9xRuLpbwtue4mdl27+jWzTfptAEV7oNYaMzYTbwo6NwdXZH/cwfouuOZkdmgsvkTaUJN0kf2425wM8RdEc+M+fbUcS9Ipyd8S6JtCWs9hB/I3AECpghOZTOyu2NsCWMe4hv5zfHoQCbuv20RyVbkbWEQyVnVVTGdrmJVCTZfiiobKthJvwtvxWcMY8LbjXEBNutXowCLpQ7wbW/NBE+E6butmgDS1GSXt7pKb6JvCXY37sLBRwmu9VMH/FqTvlaW8JylPBYn+I/5bDcp7ElqMDu0ZwsKXwbuMfjt5IJXXDZjdwt/sl5+BJZdxSMc6S5+4q/vc+LSS1BeLGE+HaD0yyPNYOlylqCfXbMQ0meZ0+JbsdH/E3ynBhXZsJHKGBJibv/eU/xTcfDerkiE2x9ZhKYZ0oY8EAJ8Y2EfU/gRkUmHEVgviw53i8jvumYMV+vwIRvCIzdrPRfCQMmcl79GXXcim5/99qaTNjV43uLCMysEuJn8UkXE04BvqogeVe1CfPkgduWz3+rQXzLeX0YkLWEp4GHZIvivxWJPwgTkAfukSjiyj4NMCXCVfxBmaCKhTWL3wKuCzxjVsVliu/8oWgJl0QiflkTVqCci2oy4FaPOtmR1QcVLW/aLu8KFHN5DeJv9uzrtzi0Gh8T/tD8fvCKGgx41rEu50p627Xr8jHhfZRyXw0GvOJQj6tyMrJVmdAr9RGUzmMgBxU7C/ZXrnRYCi0y4ReHemzV+Hqqa9qg33i9y0ty0+SFadeVuDwT5jvuY7oBRYwWHCFTdWyUBRmb/lgGbChRRp4Ji6YcBtUt7B4gNdxWo/imwsgz4aWC705qOidirQIxTYnIS2PPcUiv29YXnLkdqdmYYtJhNPNun4tJtfCEAjGNZ+xzvHtXFZTzMQruftfDLbRE2yOvs6CgLDtvCMobCgQ1HrFfBgw+55LmlWeHq8FYFuGdv9LzGqc7lBkEm+j6U4GoxuOBW3bbeFHZtXO0bCU0kcSE5IdoigFldz6HiM9ldwVNMqDzCBetsVteBK/iSDF1BiBnuGVnummKHcDDFZ/xrNIAZBapwYQ9Mhy+2eNMn0YYgOzTL/sqUq9h3Q7ZjrhhSthZ52eSjn4SuFu2Cg76CDHVBiC7k/t5H8xuS7xfFvVnog/1BmTHzvisB/wKPBjJ2csmBgOQiU5RVvR34I7Ijn00sRhguaWHCQckdRv8BYamG4AsFbanzETzjh7WjonNACTd25Z/+WGPqYkZE6MB2eio6PTzGDCxGtAUTDIgLMmAwCQDApMMCEwyIDDJgMAkAxgiA/4HGLk9bmn76mcAAAAASUVORK5CYII="/>
</defs>
</svg>
`;

const CATEGORY_ASIAN_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="asian">
<mask id="mask0_3339_1472" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="url(#pattern3)"/>
</mask>
<g mask="url(#mask0_3339_1472)">
<rect x="-1" y="-2" width="39" height="39" fill="white"/>
</g>
<defs>
<pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3339_1472" transform="scale(0.0104167)"/>
</pattern>
<image id="image0_3339_1472" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADn0lEQVR4nO2dy4tOcRjHPwwmuZUYZCsxZWPK+C8UY4os5BYLuZZJoiyIbJSVhaRYKGahLKzUlNKwU0oWLiW5vllgmPHo1KPkMr/fed935vn9znk+dWoW7zvneT7fc87v0jQHHMdxHMdxnPzo1cMxoAf4ADSAtZ6AjXzRw0MwlC8egr188RDs5YuHYC9fPAR7+eIh2MsXD8FevngI9vLFQ7CXLx6CvXzxEOzli4dgL188BHv54iHYyxcPwV6+1DmEVORLHUNITb7UKYRU5UsdQkhdvlQ5hFzkSxVDyE2+VCmEXOVLFULIXb7kHEJV5EuOIVRNvuQUQlXlSw4hVF2+pBxCXeRLiiHUTb6kFEJd5UsKIdRdvliG4PKxC8HlY3cnuHzsHkcuH7sxweVjNzC7fOxmRy4fuymqy8duneDysVusuXzsVswuH7sQXD75zI7GYzBQwA7SZVeg9ptkwNlAE+dJlwuB2k+TAdsCTdwjXe4Hat9KBqwKNPEdmEt6zANGA7WvJAM6gE+BRjaQHhsjBs+pZMKtQDPXSY/BKgzAv9gdaOYzsIB06AK+Zjx7+4ulwFigoaOkw7FArcXYsJjMuBNo6g0wx7pIYDbwOlDrbTJkU6ApAY5bFwmcjKiznwyZDjyPGAuWGda4HPgSqPGF9pIlhyOurrs6dZ1spgFDEfXtJ2NmAa8imjxlUNuZiLpeAjPJnJ0Rjf7QLYzJYoueU6qw9RCiI2KPRYBvQN8k1NOv2yESsWeVzco3Zn9oJKLpUWDPBNaxN2J9Iroo66ZiHIpoXPS4pPPzdlGsN66UOP8+KsiUiP0W+e14BqxrwznX61Qy9rw39HuVpLgSH5aQITp+FDuVnSXO06nP+uGS5xpu852XJMWeytOSYgR4B1wFtgNrgIUqulN/7tUNs2vA+yZ+/xPdlKsFRQiPmpA0Ucdj3UCsFYt0qmctf0jvoFrSqTMeK/kXgRnWElKgD3g7ieI/Aputm06N+fonKzGr1GaPMV0P1GawbYZu4HLkyjn2GNFH3Qrr5nJiCXBQ1w0xG2d/HsV3HgAH9Hc5LdAFnCshv/isP2baSI+/Q8aOHn+HTH7yJaV/qJErPf4Omfzli98J5enVR0es2DKf9VfftvHKb6jQ1SW2n31MCDDQ5NVc5q4pzuGMw5EmHyUxd8IJN99aCI3Ac3y8EFx+iyE0IgfRf4Xg8lsMoVFyBvN7CC6/RQaanD4W3/EB13Ech//yE3xAKXdU7gZVAAAAAElFTkSuQmCC"/>
</defs>
</svg>
`;

const CATEGORY_ETC_ICON = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-label="etc">
<mask id="mask0_3339_1468" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<rect width="36" height="36" fill="url(#pattern4)"/>
</mask>
<g mask="url(#mask0_3339_1468)">
<rect x="-2" y="-2" width="39" height="39" fill="white"/>
</g>
<defs>
<pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3339_1468" transform="scale(0.0104167)"/>
</pattern>
<image id="image0_3339_1468" width="96" height="96" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;

export const RESTAURANT_CATEGORY_ICON = {
  한식: CATEGORY_KOREAN_ICON,
  중식: CATEGORY_CHINESE_ICON,
  일식: CATEGORY_JAPANESE_ICON,
  양식: CATEGORY_WESTERN_ICON,
  아시안: CATEGORY_ASIAN_ICON,
  기타: CATEGORY_ETC_ICON,
};
