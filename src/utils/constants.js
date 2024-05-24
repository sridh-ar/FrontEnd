export const registration = {
    inputColumns : [
        {
          label: "Player Name",
          type: "text",
          name: "name",
          required: true,
        },
        {
          label: "Date of Birth",
          type: "date",
          name: "dob",
          required: true,
        },
        { label: "Age", type: "number", name: "age", required: true },
        {
          label: "Contact Number",
          type: "number",
          name: "contact_number",
          required: true,
        },
        {
          label: "Team Name",
          type: "text",
          name: "team_name",
          required: true,
        },
        { label: "Area", type: "text", name: "area", required: true },
        {
          label: "Jersey Name",
          type: "text",
          name: "jersey_name",
          required: true,
        },
        {
          label: "Jersey No",
          type: "number",
          name: "jersey_no",
          required: true,
        },
      ],
      selectColumns: [
        {
          label: "Jersey Size",
          name: "jersey_size",
          options: [
            "Small",
            "Medium",
            "Large",
            "Extra Large(XL)",
            "XXL",
            "XXXL",
          ],
          required: true,
        },
        {
          label: "Player Role",
          name: "player_role",
          options: ["All Rounder", "Batsman", "Bowler"],
          required: true,
        },
        {
          label: "Batting Style",
          name: "batting_style",
          options: ["N/A", "Right", "Left"],
        },
        {
          label: "Bowling Style",
          name: "bowling_style",
          options: ["N/A", "Fast", "Medium", "Spin"],
        },
      ]
      

}