import csv
import json

# Note: the form should contain the field to enter the name and the family name and the email
def extract_info(row):
    name = row["Your Full Name:"].strip()
    email = row["Username"].strip()
    return {"name": name, "email": email, "mark": 0}  # Adding a mark of 0 for each entry


with open("POPUPQUIZ/Data/quiz_data.json", "r") as json_file:
    existing_data = json.load(json_file)

# append
with open("POPUPQUIZ/Data/quiz_data.csv", "r", newline='') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        info = extract_info(row)
        print(info)  # Print extracted info for debugging
        existing_data.append(info)

# Write the updated data back to the JSON file
with open("POPUPQUIZ/Data/quiz_data.json", "w") as json_file:
    json.dump(existing_data, json_file, indent=2)
