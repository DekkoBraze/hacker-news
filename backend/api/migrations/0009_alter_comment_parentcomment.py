# Generated by Django 5.0.4 on 2024-04-14 18:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_newsitem_options_remove_newsitem_text_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='parentComment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.comment'),
        ),
    ]
