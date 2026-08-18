from django.test import TestCase
from django.urls import reverse


class HomepageTests(TestCase):
    def test_homepage_loads(self):
        response = self.client.get(reverse("home:index"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Ask your data")
