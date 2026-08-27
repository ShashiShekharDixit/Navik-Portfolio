# Toggle Switch - Self to Team ✅

## Change Made

Switched the dashboard toggle from "Self" to "Team" view.

---

## Before ❌

```html
<div class="adm-self-team">
  <button class="adm-st-btn active">Self</button>
  <button class="adm-st-btn">Team</button>
</div>
```

**Result:** "Self" button was active (highlighted)

---

## After ✅

```html
<div class="adm-self-team">
  <button class="adm-st-btn">Self</button>
  <button class="adm-st-btn active">Team</button>
</div>
```

**Result:** "Team" button is now active (highlighted)

---

## Visual Change

### Before:
```
┌─────────────────────────┐
│ [Self] Team    09 May   │  ← Self was active
└─────────────────────────┘
```

### After:
```
┌─────────────────────────┐
│ Self [Team]    09 May   │  ← Team is now active
└─────────────────────────┘
```

---

## Location

**File:** `index.html`  
**Line:** ~550-552  
**Section:** Dashboard preview - Admin view top bar

---

## What This Means

The dashboard now shows the **Team** view by default instead of the **Self** view.

- **Self View:** Shows individual employee's own data
- **Team View:** Shows team/manager view with all employees' data

---

## File Modified

✅ `index.html` - Changed `active` class from Self button to Team button

---

## Testing

1. Open `index.html` in browser
2. Scroll to dashboard preview section
3. Look at top-right toggle
4. Verify "Team" button is highlighted (blue background)
5. Verify "Self" button is not highlighted (gray background)

---

## Status

✅ **Complete!** Toggle now defaults to "Team" view.
