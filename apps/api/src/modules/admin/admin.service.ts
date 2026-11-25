import { prisma } from '../../config/prisma';

export class AdminService {
  async getPlatformStats() {
    const [totalUsers, totalVenues, pendingVenues, totalBookings, confirmedBookings] =
      await Promise.all([
        prisma.user.count(),
        prisma.turfVenue.count(),
        prisma.turfVenue.count({ where: { approvalStatus: 'PENDING' } }),
        prisma.booking.count(),
        prisma.booking.findMany({
          where: { status: 'CONFIRMED' },
          select: { finalAmount: true, convenienceFee: true },
        }),
      ]);

    const totalGrossRevenue = confirmedBookings.reduce(
      (acc, curr) => acc + Number(curr.finalAmount),
      0,
    );

    const platformCommissionEarned = confirmedBookings.reduce(
      (acc, curr) => acc + Number(curr.convenienceFee),
      0,
    );

    return {
      totalUsers,
      totalVenues,
      pendingVenues,
      totalBookings,
      totalGrossRevenue,
      platformCommissionEarned,
    };
  }

  async listUsers(role?: string) {
    return prisma.user.findMany({
      where: role ? { role: role as any } : undefined,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async setTurfApprovalStatus(
    adminId: string,
    venueId: string,
    status: 'APPROVED' | 'REJECTED' | 'SUSPENDED',
  ) {
    const venue = await prisma.turfVenue.update({
      where: { id: venueId },
      data: { approvalStatus: status },
    });

    await prisma.adminActivityLog.create({
      data: {
        adminId,
        action: `VENUE_${status}`,
        targetType: 'TURF_VENUE',
        targetId: venueId,
      },
    });

    return venue;
  }
}

export const adminService = new AdminService();
