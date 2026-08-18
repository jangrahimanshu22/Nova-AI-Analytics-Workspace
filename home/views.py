from django.shortcuts import render


def index(request):
    """Render the homepage with clearly labelled product-demo analytics data."""
    demo_series = {
        "revenue": {
            "label": "Revenue (₹)",
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            "values": [1420000, 1590000, 1510000, 1880000, 2050000, 2400000, 2840000],
            "summary": "₹2.84M",
            "change": "+18.4%",
            "description": "Monthly revenue trend",
        },
        "customers": {
            "label": "Active customers",
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            "values": [420, 468, 495, 538, 602, 651, 724],
            "summary": "724",
            "change": "+11.2%",
            "description": "Active customer trend",
        },
        "orders": {
            "label": "Orders",
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            "values": [10260, 11680, 12120, 13540, 14980, 16330, 18429],
            "summary": "18,429",
            "change": "+12.8%",
            "description": "Monthly order trend",
        },
    }
    return render(request, "home/index.html", {"demo_series": demo_series})
