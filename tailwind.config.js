/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Theme 1 //
        // theme 1 - BG //
        "verydarkdesaturatedblue-main": "hsl(222, 26%, 31%)",
        "verydarkdesaturatedblue-tggl-bg": "hsl(223, 31%, 20%)",
        "verydarkdesaturatedblue-scrn": "hsl(224, 36%, 15%)",
        // theme 1- Keys
        desaturateddarkbluebg: "hsl(225, 21%, 49%)",
        'desaturateddarkblue-hover': "hsl(225, 21%, 74%)",
        desaturateddarkblueshadow: "hsl(224, 28%, 35%)",
        redkeybgtggl: "hsl(6, 63%, 50%)",
        'redkeybgtggl-hover': "hsl(6, 63%, 70%)",
        darkredkeyshadow: "hsl(6, 70%, 34%)",
        lightgrayishorangekeybg: "hsl(30, 25%, 89%)",
        'lightgrayishorangekey-hover': "hsl(30, 25%, 99%)",
        grayishorangekeyshadow: "hsl(28, 16%, 65%)",
        // theme 1 - Text
        "very-dark-grayish-blue": "hsl(221, 14%, 31%)",
        // -- -- //
        // Theme 2 //
        // theme 2 - BG
        "lightgray-mainbg": "hsl(0, 0%, 90%)",
        "grayish-red": "hsl(0, 5%, 81%)",
        "very-light-gray": "hsl(0, 0%, 93%)",
        //  theme 2 - Keys
        "dark-moderate-cyan": "hsl(185, 42%, 37%)",
        "dark-moderate-cyan-hover": "hsl(185, 42%, 67%)",
        "very-dark-cyan": "hsl(185, 58%, 25%)",
        "orange-key": "hsl(25, 98%, 40%)",
        "orange-key-hover": "hsl(25, 98%, 70%)",
        "dark-orange": "hsl(25, 99%, 27%)",
        "light-grayish-yellow": "hsl(45, 7%, 89%)",
        "light-grayish-yellow-hover": "hsl(45, 7%, 99%)",
        "dark-grayish-orange": "hsl(35, 11%, 61%)",
        //  theme 2 - Text
        "very-dark-grayish-yellow": " hsl(60, 10%, 19%)",
        // -- -- //
        // Theme 3 //
        // theme 3 - BG
        "very-dark-violet-main": "hsl(268, 75%, 9%)",
        "very-dark-violet-screen": "hsl(268, 71%, 12%)",
        // theme 3 - Keys
        "dark-violet": "hsl(281, 89%, 26%)",
        "dark-violet-hover": "hsl(281, 89%, 56%)",
        "vivid-magenta": "hsl(285, 91%, 52%)",
        "pure-cyan": "hsl(176, 100%, 44%)",
        "pure-cyan-hover": "hsl(176, 100%, 74%)",
        "soft-cyan": "hsl(177, 92%, 70%)",
        "very-dark-violet": "hsl(268, 47%, 21%)",
        "very-dark-violet-hover": "hsl(268, 47%, 51%)",
        "dark-magenta": "hsl(290, 70%, 36%)",
        // theme 3 - Text
        "light-yellow": "hsl(52, 100%, 62%)",
        "very-dark-blue": "hsl(198, 20%, 13%)",
      },
      fontFamily: {
        'leagu-spartan': ['var(--font-leagu-spartan)'],
      },
    },
  },
  plugins: [],
};
